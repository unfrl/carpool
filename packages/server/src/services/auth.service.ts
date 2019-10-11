import { Injectable, HttpException, HttpStatus, Inject, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { AuthDto, SignUpDto, SignInDto, PasswordResetRequestDto, PasswordResetDto } from "../dtos";
import { JwtPayload } from "../interfaces";
import { authConfig } from "../config";
import { UserService } from "./user.service";
import cryptoRandomString = require("crypto-random-string");
import IORedis = require("ioredis");
import { MailerService } from "@nest-modules/mailer";

@Injectable()
export class AuthService {
    public constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService,
        @Inject(IORedis)
        private readonly _redisClient: IORedis.Redis,
        private readonly _mailerService: MailerService
    ) {}

    public async signIn(signInDto: SignInDto): Promise<AuthDto> {
        const { email, password } = signInDto;

        const user = await this._userService.findOneByEmail(email);
        if (!user || !user.isVerified) {
            // TODO: if user isn't verified, include message in response that verification is pending
            throw new HttpException("Failed to sign in", HttpStatus.BAD_REQUEST);
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            throw new HttpException("Failed to sign in", HttpStatus.BAD_REQUEST);
        }

        return this.generateAccessToken(user.id);
    }

    public async signUp(signUpDto: SignUpDto): Promise<void> {
        const { email, password, displayName } = signUpDto;

        const existing = await this._userService.findOneByEmail(email);
        if (existing) {
            throw new HttpException("Failed to sign up", HttpStatus.BAD_REQUEST);
        }

        const hashed = await bcrypt.hash(password, authConfig.saltOrRounds);
        await this._userService.createUser(email, hashed, displayName);
    }

    public async generateAccessToken(userId: string): Promise<AuthDto> {
        const tokenPayload: JwtPayload = { sub: userId };
        const token = this._jwtService.sign(tokenPayload);

        return {
            access_token: token,
        };
    }

    public async requestPasswordReset(
        passwordResetRequestDto: PasswordResetRequestDto
    ): Promise<void> {
        if (!(await this._userService.findOneByEmail(passwordResetRequestDto.email))) {
            //Dont throw anything if they give us a non-member email or they can use that to determin who is and isnt a member
            return;
        }

        let passwordResetToken = cryptoRandomString({ length: 12, type: "url-safe" });
        let redisKey = this.getPasswordResetTokenRedisKey(
            passwordResetToken,
            passwordResetRequestDto.email
        );

        await this._redisClient.setex(redisKey, 86400, ""); //Currently this sets the key to expire in 1 day (86400 seconds)

        let hostname = "localhost:3000"; //TODO: This has to be configurable
        let schema = "http"; //TODO: This has to be configurable
        let passwordResetURL = `${schema}://${hostname}/passwordreset?token=${passwordResetToken}&email=${passwordResetRequestDto.email}`;

        await this._mailerService.sendMail({
            to: passwordResetRequestDto.email,
            from: "noreply@carpool+unfrl.com",
            subject: "Carpool Password Reset Requested",
            html: `<h1>Hello!</h1>\n<p>\A password reset request has been made for your Carpool account. If you did not initiate this request you can ignore this message. If you did request this please go <a href=\"${passwordResetURL}\">here</a> to reset your password\n</p>\n`,
        });
        console.log("Sent password reset email");
    }

    private getPasswordResetTokenRedisKey(token: string, email: string) {
        return `VERTOKEN_${email}_${token}`;
    }

    public async resetUserPassword(passwordResetDto: PasswordResetDto): Promise<AuthDto> {
        let redisKey = this.getPasswordResetTokenRedisKey(
            passwordResetDto.token,
            passwordResetDto.email
        );
        if (!(await this._redisClient.exists(redisKey))) {
            throw new ConflictException("Token provided is either expired or invalid.");
        }
        await this._redisClient.del(redisKey);
        const user = await this._userService.updatePassword(
            passwordResetDto.email,
            passwordResetDto.newPassword
        );
        return this.generateAccessToken(user.id);
    }
}

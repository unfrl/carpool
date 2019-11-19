import { Injectable, HttpException, HttpStatus, Inject, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import {
    AuthDto,
    SignUpDto,
    SignInDto,
    PasswordResetRequestDto,
    PasswordResetDto,
    GoogleSignInDto,
    SocialAuthDto,
} from "../dtos";
import { JwtPayload } from "../interfaces";
import { authConfig } from "../config";
import { UserService } from "./user.service";
import { authProviderConfig, appConfig, SocialLoginSteps } from "@carpool/common";
import cryptoRandomString = require("crypto-random-string");
import IORedis = require("ioredis");
import { MailerService } from "@nest-modules/mailer";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthService {
    public constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService,
        @Inject(IORedis)
        private readonly _redisClient: IORedis.Redis,
        private readonly _mailerService: MailerService,
        @Inject(OAuth2Client)
        private readonly _oauth2Client: OAuth2Client
    ) {}

    public async signInOrCreateUserWithGoogle(
        googleSignInDto: GoogleSignInDto
    ): Promise<SocialAuthDto> {
        const { idToken, displayName } = googleSignInDto;
        if (!authProviderConfig.googleClientId) {
            throw new HttpException(
                "This server is not configured to support Google Authentication",
                HttpStatus.NOT_IMPLEMENTED
            );
        }

        const ticket = await this._oauth2Client.verifyIdToken({
            idToken: idToken,
            audience: authProviderConfig.googleClientId,
        });
        const payload = ticket.getPayload();

        let user = await this._userService.findOneByEmail(payload.email);
        const googleUserId = payload.sub;
        if (!user) {
            let displayNameTaken = displayName
                ? await this._userService.displayNameExists(displayName.trim())
                : false;
            if (!displayName || displayNameTaken) {
                let response = new SocialAuthDto();
                response.nextStep = SocialLoginSteps.DisplayNameRequired;
                response.error = displayNameTaken
                    ? "The specified display name is already taken, please try again"
                    : undefined;
                return response;
            }
            user = await this._userService.createGoogleUser(
                payload.email,
                googleUserId,
                displayName,
                payload.given_name,
                payload.family_name
            );
        }

        //TODO: Discuss -> This is an attempt to deal with the situation where someone makes an account using a gmail address but with their own password, then later use the 'Sign in with google' button
        // if (!user.googleId) {
        //     user.googleId = googleUserId;
        //     Save this user???
        // }
        let response = new SocialAuthDto();
        response.nextStep = SocialLoginSteps.None;
        response.accessToken = (await this.generateAccessToken(user.id)).accessToken;
        return response;
    }

    public async signIn(signInDto: SignInDto): Promise<AuthDto> {
        const { email, password } = signInDto;
        let lowerCaseEmail = email.toLowerCase();

        const user = await this._userService.findOneByEmail(lowerCaseEmail);
        if (!user) {
            // TODO: if user isn't verified, include message in response that verification is pending
            throw new HttpException(
                "That email doesn't match an existing account.",
                HttpStatus.BAD_REQUEST
            );
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            throw new HttpException("The email and password don't match.", HttpStatus.BAD_REQUEST);
        }

        if (!user.isVerified) {
            throw new HttpException(
                "Your account hasn't been verified yet.",
                HttpStatus.BAD_REQUEST
            );
        }

        return this.generateAccessToken(user.id);
    }

    public async signUp(signUpDto: SignUpDto): Promise<void> {
        const { email, password, displayName } = signUpDto;
        let lowerCaseEmail = email.toLowerCase();

        const existing = await this._userService.findOneByEmail(lowerCaseEmail);
        if (existing) {
            throw new HttpException(
                "That email address is already in use.",
                HttpStatus.BAD_REQUEST
            );
        }

        const trimmedDisplayName = displayName.trim();
        if (!trimmedDisplayName) {
            throw new HttpException("Display name cannot be blank.", HttpStatus.BAD_REQUEST);
        }

        if (await this._userService.displayNameExists(trimmedDisplayName)) {
            throw new HttpException("Display name already in use.", HttpStatus.BAD_REQUEST);
        }

        const hashed = await bcrypt.hash(password, authConfig.saltOrRounds);
        await this._userService.createUser(lowerCaseEmail, hashed, trimmedDisplayName);
    }

    public async generateAccessToken(userId: string): Promise<AuthDto> {
        const tokenPayload: JwtPayload = { sub: userId };
        const token = this._jwtService.sign(tokenPayload);

        return {
            accessToken: token,
        };
    }

    public async requestPasswordReset(
        passwordResetRequestDto: PasswordResetRequestDto
    ): Promise<void> {
        let lowerCaseEmail = passwordResetRequestDto.email.toLowerCase();
        const user = await this._userService.findOneByEmail(lowerCaseEmail);
        if (!user) {
            //Dont throw anything if they give us a non-member email or they can use that to determine who is and isnt a member
            console.log(
                `Password reset requested for ${lowerCaseEmail} but that email is not associated with any user.`
            );
            return;
        }
        if (user.googleId) {
            //Dont throw anything if they give us a google acount's email or they can use that to determine who is and isnt a member
            console.log(
                `Password reset requested for ${lowerCaseEmail} but that email is associated with a google account, we cant reset their password.`
            );
            return;
        }

        let passwordResetToken = cryptoRandomString({ length: 12, type: "url-safe" });
        let redisKey = this.getPasswordResetTokenRedisKey(passwordResetToken, lowerCaseEmail);

        await this._redisClient.setex(redisKey, 86400, ""); //Currently this sets the key to expire in 1 day (86400 seconds)

        let hostname = appConfig.host;
        let schema = appConfig.scheme;
        let passwordResetURL = `${schema}://${hostname}/passwordreset?token=${passwordResetToken}&email=${lowerCaseEmail}`;

        await this._mailerService.sendMail({
            to: lowerCaseEmail,
            from: "noreply@carpool+unfrl.com",
            subject: "Carpool Password Reset Requested",
            html: `<h1>Hello!</h1>\n<p>\A password reset request has been made for your Carpool account. If you did not initiate this request you can ignore this message. If you did request this please go <a href=\"${passwordResetURL}\">here</a> to reset your password\n</p>\n`,
        });
    }

    private getPasswordResetTokenRedisKey(token: string, email: string) {
        return `PASSRSTOKEN_${email}_${token}`;
    }

    public async resetUserPassword(passwordResetDto: PasswordResetDto): Promise<AuthDto> {
        let lowerCaseEmail = passwordResetDto.email.toLowerCase();
        let redisKey = this.getPasswordResetTokenRedisKey(passwordResetDto.token, lowerCaseEmail);
        if (!(await this._redisClient.exists(redisKey))) {
            throw new ConflictException("Token provided is either expired or invalid.");
        }
        await this._redisClient.del(redisKey);
        const user = await this._userService.updatePassword(
            lowerCaseEmail,
            passwordResetDto.newPassword
        );
        return this.generateAccessToken(user.id);
    }
}

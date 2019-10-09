import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { AuthDto, SignUpDto, SignInDto } from "../dtos";
import { JwtPayload } from "../interfaces";
import { authConfig } from "../config";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
    public constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService
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
}

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
        if (!user) {
            throw new HttpException("Failed to sign in", HttpStatus.BAD_REQUEST);
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            throw new HttpException("Failed to sign in", HttpStatus.BAD_REQUEST);
        }

        const tokenPayload: JwtPayload = { sub: user.id, type: "user" };
        const token = this._jwtService.sign(tokenPayload);

        return {
            access_token: token,
        };
    }

    public async signUp(signUpDto: SignUpDto): Promise<AuthDto> {
        const { email, password, displayName } = signUpDto;

        const existing = await this._userService.findOneByEmail(email);
        if (existing) {
            throw new HttpException("Failed to sign up", HttpStatus.BAD_REQUEST);
        }

        const hashed = await bcrypt.hash(password, authConfig.saltOrRounds);
        const user = await this._userService.createUser(email, hashed, displayName);

        const tokenPayload: JwtPayload = { sub: user.id, type: "user" };
        const token = this._jwtService.sign(tokenPayload);

        return {
            access_token: token,
        };
    }
}

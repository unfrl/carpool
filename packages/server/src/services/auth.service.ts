import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { AuthDto, SignUpDto, UserDto } from "../dtos";
import { JwtPayload } from "../interfaces";
import { authConfig } from "../config";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
    public constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService
    ) {}

    public async signIn(authDto: AuthDto): Promise<UserDto | null> {
        const { email, password } = authDto;

        const user = await this._userService.findOneByEmail(email);
        if (!user) {
            return null;
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return null;
        }

        const tokenPayload: JwtPayload = { sub: user.id, type: "user" };
        const token = this._jwtService.sign(tokenPayload);

        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            accessToken: token,
        };
    }

    public async signUp(signUpDto: SignUpDto): Promise<UserDto | null> {
        const { email, password, displayName } = signUpDto;

        const existing = await this._userService.findOneByEmail(email);
        if (existing) {
            return null;
        }

        const hashed = await bcrypt.hash(password, authConfig.saltOrRounds);
        const user = await this._userService.createUser(email, hashed, displayName);

        const tokenPayload: JwtPayload = { sub: user.id, type: "user" };
        const token = this._jwtService.sign(tokenPayload);

        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            accessToken: token,
        };
    }
}

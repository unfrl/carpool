import { Controller, Post, Get, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "../services";
import { AuthDto, SignUpDto } from "../dtos";
import { IJwtPayload } from "../interfaces";

@Controller("api/v1/auth")
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    @Post("signup")
    @HttpCode(HttpStatus.OK)
    public async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
        const { email, password, name } = signUpDto;
        const user = await this.userService.signUp(email, password, name);

        const tokenPayload: IJwtPayload = { sub: user.id, type: "user" };
        const token = this.jwtService.sign(tokenPayload);
        return {
            data: {
                id: user.id,
                email: user.email,
                name: user.displayName,
                accessToken: token,
            },
        };
    }

    @Post("signin")
    @HttpCode(HttpStatus.OK)
    public async signIn(@Body() authDto: AuthDto): Promise<any> {
        const { email, password } = authDto;
        const user = await this.userService.signIn(email, password);
        const tokenPayload: IJwtPayload = { sub: user.id, type: "user" };
        const token = this.jwtService.sign(tokenPayload);

        return { data: { accessToken: token } };
    }
}

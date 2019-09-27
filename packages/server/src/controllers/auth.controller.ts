import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiUseTags, ApiOperation, ApiOkResponse } from "@nestjs/swagger";

import { UserService } from "../services";
import { AuthDto, SignUpDto, UserDto } from "../dtos";
import { IJwtPayload } from "../interfaces";

@ApiUseTags("Auth")
@Controller("api/v1/auth")
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    @ApiOperation({
        operationId: "signUp",
        title: "Sign up",
        description: "Sign up a new user",
    })
    @ApiOkResponse({ type: UserDto })
    @Post("signup")
    @HttpCode(HttpStatus.OK)
    public async signUp(@Body() signUpDto: SignUpDto): Promise<UserDto> {
        const { email, password, displayName } = signUpDto;
        const user = await this.userService.signUp(email, password, displayName);

        const tokenPayload: IJwtPayload = { sub: user.id, type: "user" };
        const token = this.jwtService.sign(tokenPayload);

        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            accessToken: token,
        };
    }

    @ApiOperation({
        operationId: "signIn",
        title: "Sign in",
        description: "Sign in an existing user",
    })
    @ApiOkResponse({ type: UserDto })
    @Post("signin")
    @HttpCode(HttpStatus.OK)
    public async signIn(@Body() authDto: AuthDto): Promise<UserDto> {
        const { email, password } = authDto;
        const user = await this.userService.signIn(email, password);

        const tokenPayload: IJwtPayload = { sub: user.id, type: "user" };
        const token = this.jwtService.sign(tokenPayload);

        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            accessToken: token,
        };
    }
}

import { Controller, Post, Body, HttpCode, HttpStatus, HttpException } from "@nestjs/common";
import { ApiUseTags, ApiOperation, ApiOkResponse } from "@nestjs/swagger";

import { AuthService } from "../services";
import { AuthDto, SignUpDto, UserDto } from "../dtos";

@ApiUseTags("Auth")
@Controller("api/v1/auth")
export class AuthController {
    public constructor(private readonly _authService: AuthService) {}

    @ApiOperation({
        operationId: "signUp",
        title: "Sign up",
        description: "Sign up a new user",
    })
    @ApiOkResponse({ type: UserDto })
    @Post("signup")
    @HttpCode(HttpStatus.OK)
    public async signUp(@Body() signUpDto: SignUpDto): Promise<UserDto> {
        const userDto = await this._authService.signUp(signUpDto);
        if (!userDto) {
            throw new HttpException("Failed to sign up", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return userDto;
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
        const userDto = await this._authService.signIn(authDto);
        if (!userDto) {
            throw new HttpException("Failed to sign in", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return userDto;
    }
}

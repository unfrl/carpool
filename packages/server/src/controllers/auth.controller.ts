import { Controller, Post, Body, HttpStatus, HttpCode } from "@nestjs/common";
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { AuthService } from "../services";
import { AuthDto, SignUpDto, SignInDto } from "../dtos";

@ApiUseTags("Auth")
@Controller("api/v1/auth")
export class AuthController {
    public constructor(private readonly _authService: AuthService) {}

    @ApiOperation({
        operationId: "signUp",
        title: "Sign up",
        description: "Sign up a new user",
    })
    @ApiResponse({ status: HttpStatus.OK })
    @HttpCode(200)
    @Post("signup")
    public async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
        return await this._authService.signUp(signUpDto);
    }

    @ApiOperation({
        operationId: "signIn",
        title: "Sign in",
        description: "Sign in an existing user",
    })
    @ApiResponse({ status: HttpStatus.OK, type: AuthDto })
    @HttpCode(200)
    @Post("signin")
    public async signIn(@Body() signInDto: SignInDto): Promise<AuthDto> {
        return await this._authService.signIn(signInDto);
    }
}

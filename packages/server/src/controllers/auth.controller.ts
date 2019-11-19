import {
    Controller,
    Post,
    Body,
    HttpStatus,
    HttpCode,
    Param,
    Put,
    UnauthorizedException,
} from "@nestjs/common";
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { AuthService } from "../services";
import {
    AuthDto,
    SignUpDto,
    SignInDto,
    PasswordResetRequestDto,
    PasswordResetDto,
    GoogleSignInDto,
    SocialAuthDto,
} from "../dtos";

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

    @ApiOperation({
        operationId: "signInWithGoogle",
        title: "Sign in with Google",
        description:
            "Sign in using a google user's idToken. This will create a user if it doesnt exist. It might also request further steps, such as setting a display name.",
    })
    @ApiResponse({ status: HttpStatus.OK, type: SocialAuthDto })
    @HttpCode(200)
    @Post("signinwithgoogle")
    public async signInWithGoogle(
        @Body() googleSignInDto: GoogleSignInDto
    ): Promise<SocialAuthDto> {
        let result = await this._authService.signInOrCreateUserWithGoogle(googleSignInDto);
        return result;
    }

    @ApiOperation({
        operationId: "requestPasswordReset",
        title: "Request Password Reset",
        description: "Sends a password reset to the specified email if it exists",
    })
    @ApiResponse({ status: HttpStatus.OK })
    @HttpCode(200)
    @Post("requestpasswordreset")
    public async requestPasswordReset(
        @Body() passwordResetRequestDto: PasswordResetRequestDto
    ): Promise<void> {
        return await this._authService.requestPasswordReset(passwordResetRequestDto);
    }

    @ApiOperation({
        operationId: "resetPassword",
        title: "Reset User Password",
        description:
            "Reset a User's password using the token emailed to them after requesting a password reset",
    })
    @ApiResponse({ status: HttpStatus.OK, type: AuthDto })
    @Put("resetpassword")
    public async resetPassword(@Body() passwordResetDto: PasswordResetDto): Promise<AuthDto> {
        return await this._authService.resetUserPassword(passwordResetDto);
    }
}

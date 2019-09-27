import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiUseTags, ApiOperation } from "@nestjs/swagger";

import { UserService } from "../services";
import { AuthDto, SignUpDto } from "../dtos";
import { IJwtPayload } from "../interfaces";

@ApiUseTags("Auth")
@Controller("api/v1/auth")
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    // TODO: return types should be specified and defined in the APIOkResponse with swagger
    @ApiOperation({
        operationId: "signUp",
        title: "Sign up",
        description: "Sign up a new user",
    })
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

    @ApiOperation({
        operationId: "signIn",
        title: "Sign in",
        description: "Sign in an existing user",
    })
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

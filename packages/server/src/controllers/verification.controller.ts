import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Controller, Put, Body, HttpStatus } from "@nestjs/common";

import { VerificationService, AuthService } from "../services";
import { AuthDto, VerificationDto } from "../dtos";

@ApiTags("Verification")
@Controller("api/v1/verification")
export class VerificationController {
    public constructor(
        private readonly _verificationService: VerificationService,
        private readonly _authService: AuthService
    ) {}

    @ApiOperation({
        operationId: "verifyUser",
        summary: "Verify User",
        description: "Verify a User using the token emailed to them during account creation",
    })
    @ApiResponse({ status: HttpStatus.OK, type: AuthDto })
    @Put()
    public async verifyUser(@Body() verificationDto: VerificationDto): Promise<AuthDto> {
        const user = await this._verificationService.verifyUser(verificationDto);
        return this._authService.generateAccessToken(user.id);
    }
}

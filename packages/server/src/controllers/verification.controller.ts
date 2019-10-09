import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Controller, Get, Query, HttpStatus } from "@nestjs/common";
import { VerificationService } from "src/services/verification.service";

@ApiUseTags("Verification")
@Controller("api/v1/verification")
export class VerificationController {
    public constructor(private readonly _verificationService: VerificationService) {}

    @ApiOperation({
        operationId: "verifyUser",
        title: "Verify User",
        description: "Verify a User using the token emailed to them during account creation",
    })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.CONFLICT })
    @Get()
    public async verifyUser(@Query("token") token, @Query("email") email): Promise<string> {
        return await this._verificationService.verifyUser(token, email);
    }
}

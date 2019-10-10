import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Controller, Get, HttpStatus, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserDto } from "../dtos";
import { UserRequest } from "../interfaces";

@ApiUseTags("User")
@ApiBearerAuth()
@Controller("api/v1/user")
export class UserController {
    @ApiOperation({
        operationId: "getProfile",
        title: "Get user profile",
        description: "Gets the current user's profile",
    })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @UseGuards(AuthGuard("jwt"))
    @Get("me")
    public getProfile(@Req() request: UserRequest): UserDto {
        const { id, displayName, email } = request.user;

        return {
            id,
            displayName,
            email,
        };
    }
}

import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Controller, Get, HttpStatus, Req, UseGuards, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserDto } from "../dtos";
import { UserRequest } from "../interfaces";
import { Carpool } from "../entities";
import { CarpoolService } from "../services";

@ApiUseTags("Users")
@ApiBearerAuth()
@Controller("api/v1/users")
export class UserController {
    public constructor(private readonly _carpoolService: CarpoolService) {}

    @ApiOperation({
        operationId: "getMyProfile",
        title: "Get user profile",
        description: "Gets the current user's profile",
    })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @UseGuards(AuthGuard("jwt"))
    @Get("me")
    public getMyProfile(@Req() request: UserRequest): UserDto {
        const { id, displayName, email } = request.user;

        return {
            id,
            displayName,
            email,
        };
    }

    @ApiOperation({
        operationId: "getMyCarpools",
        title: "Get user's carpools",
        description: "Gets a collection of carpools created by the current user",
    })
    @ApiResponse({ status: HttpStatus.OK, type: Carpool, isArray: true })
    @UseGuards(AuthGuard("jwt"))
    @Get("me/carpools")
    public async getMyCarpools(@Req() request: UserRequest): Promise<Carpool[]> {
        return await this._carpoolService.findCarpoolsByCreatedBy(request.user.id);
    }
}

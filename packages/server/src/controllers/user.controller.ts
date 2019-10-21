import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import {
    Controller,
    Get,
    HttpStatus,
    Req,
    UseGuards,
    Param,
    NotFoundException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserDto } from "../dtos";
import { UserRequest } from "../interfaces";
import { Carpool } from "../entities";
import { CarpoolService, UserService } from "../services";
import { mapUserToDto } from "../mappers";

@ApiUseTags("Users")
@ApiBearerAuth()
@Controller("api/v1/users")
export class UserController {
    public constructor(
        private readonly _carpoolService: CarpoolService,
        private readonly _userService: UserService
    ) {}

    @ApiOperation({
        operationId: "getMyProfile",
        title: "Get user profile",
        description: "Gets the current user's profile",
    })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @UseGuards(AuthGuard("jwt"))
    @Get("me")
    public getMyProfile(@Req() request: UserRequest): UserDto {
        return mapUserToDto(request.user);
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

    @ApiOperation({
        operationId: "getUserCarpools",
        title: "Get a user's carpools",
        description: "Get a user's carpools by their display name",
    })
    @ApiResponse({ status: HttpStatus.OK, type: Carpool, isArray: true })
    @Get(":displayName/carpools")
    public async getUserCarpools(@Param("displayName") displayName: string): Promise<Carpool[]> {
        const user = await this._userService.findOneByDisplayName(displayName);
        if (!user) {
            throw new NotFoundException("User not found.");
        }

        return await this._carpoolService.findCarpoolsByCreatedBy(user.id);
    }
}

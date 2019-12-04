import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import {
    Controller,
    Get,
    HttpStatus,
    Req,
    UseGuards,
    Param,
    Query,
    NotFoundException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserDto, CarpoolDto, CarpoolQueryDto, CarpoolQueryResponseDto } from "../dtos";
import { UserRequest } from "../interfaces";
import { CarpoolService, UserService } from "../services";
import { mapUserToDto } from "../mappers";

@ApiUseTags("Users")
@Controller("api/v1/users")
export class UserController {
    public constructor(
        private readonly _carpoolService: CarpoolService,
        private readonly _userService: UserService
    ) { }

    @ApiOperation({
        operationId: "getMyProfile",
        title: "Get user profile",
        description: "Gets the current user's profile",
    })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @ApiBearerAuth()
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
    @ApiResponse({ status: HttpStatus.OK, type: CarpoolQueryResponseDto, isArray: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Get("me/carpools")
    public async getMyCarpools(
        @Req() request: UserRequest,
        @Query() query: CarpoolQueryDto
    ): Promise<CarpoolQueryResponseDto[]> {
        return await this._carpoolService.queryCarpoolsByUser(request.user.id, query.type);
    }

    @ApiOperation({
        operationId: "getUserCarpools",
        title: "Get a user's carpools",
        description: "Get a user's carpools by their display name",
    })
    @ApiResponse({ status: HttpStatus.OK, type: CarpoolDto, isArray: true })
    @Get(":displayName/carpools")
    public async getUserCarpools(@Param("displayName") displayName: string): Promise<CarpoolDto[]> {
        const user = await this._userService.findOneByDisplayName(displayName);
        if (!user) {
            throw new NotFoundException("User not found.");
        }

        return await this._carpoolService.findCarpoolsByCreatedBy(user.id);
    }
}

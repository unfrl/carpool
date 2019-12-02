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

import { UserDto, CarpoolDto } from "../dtos";
import { UserRequest } from "../interfaces";
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
    @ApiResponse({ status: HttpStatus.OK, type: CarpoolDto, isArray: true })
    @UseGuards(AuthGuard("jwt"))
    @Get("me/carpools")
    public async getMyCarpools(@Req() request: UserRequest): Promise<CarpoolDto[]> {
        return await this._carpoolService.findCarpoolsByCreatedBy(request.user.id);
    }

    // TODO instead of separate endpoints for each (carpools i created, carpools i'm driving in, carpools i'm a passenger of):
    // - modify "me/carpools" to accept a `type` query param with one of the three options (allow multiple?)
    // - may want to update the response to include the type, e.g {type: 'created', carpools: ...}[]
    // - carpool store can either store all w/ the type, or as dictionary, etc
    // - ":displayName/carpools" could be updated to use similar logic but not accepting a type param -- only allowed to view created
    //   - ^ b/c of this, we may want to conditionally fetch the carpools on the frontend depending if the page being requested is the current user
    //       (e.g if is current user => me/carpools?type=created,driving,passenger else => :displayName/carpools)
    @ApiOperation({
        operationId: "getMyDrivingCarpools",
        title: "Get user's carpools they're driving for",
        description: "Gets a collection of carpools that the current user is a driver of",
    })
    @ApiResponse({ status: HttpStatus.OK, type: CarpoolDto, isArray: true })
    @UseGuards(AuthGuard("jwt"))
    @Get("me/carpools/driving")
    public async getMyDrivingCarpools(@Req() request: UserRequest): Promise<CarpoolDto[]> {
        return await this._carpoolService.findCarpoolsByDriver(request.user.id);
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

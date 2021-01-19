import {
    ApiOperation,
    ApiTags,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiResponse,
} from "@nestjs/swagger";
import {
    Post,
    Body,
    Controller,
    Param,
    UseGuards,
    Req,
    HttpStatus,
    HttpCode,
    Delete,
    Get,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserRequest } from "../interfaces";
import { UpsertDriverDto, DriverDto } from "../dtos";
import { DriverService } from "../services";
import { CarpoolGateway } from "../gateways";
import { DriverModificationGuard } from "../guards";
import { mapDriverToDto } from "../mappers";

@ApiTags("Drivers")
@ApiBearerAuth()
@Controller("api/v1/carpools/:id/drivers")
export class DriverController {
    public constructor(
        private readonly _driverService: DriverService,
        private readonly _carpoolGateway: CarpoolGateway
    ) {}

    @ApiOperation({
        operationId: "createDriver",
        summary: "Create Driver",
        description: "Create a driver for a carpool",
    })
    @ApiCreatedResponse({ type: DriverDto })
    @UseGuards(AuthGuard("jwt"))
    @Post()
    public async createDriver(
        @Req() request: UserRequest,
        @Param("id") carpoolId: string,
        @Body() createDriverDto: UpsertDriverDto
    ): Promise<DriverDto> {
        const driver = await this._driverService.createDriver(
            carpoolId,
            request.user.id,
            createDriverDto
        );
        this._carpoolGateway.emitDriverAdded(driver);
        return driver;
    }

    @ApiOperation({
        operationId: "getDrivers",
        summary: "Get Drivers",
        description: "Get all the drivers signed up for a carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: DriverDto, isArray: true })
    @UseGuards(AuthGuard("jwt"))
    @Get()
    public async getDrivers(@Param("id") carpoolId: string): Promise<DriverDto[]> {
        return await this._driverService.findDriversByCarpoolId(carpoolId);
    }

    @ApiOperation({
        operationId: "deleteDriver",
        summary: "Delete Driver",
        description: "Delete the specified driver, email any of their passengers",
    })
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"), DriverModificationGuard)
    @HttpCode(204)
    @Delete(":driverId")
    public async removeDriver(
        @Req() request: UserRequest,
        @Param("id") carpoolId: string,
        @Param("driverId") driverId: string
    ): Promise<void> {
        const driver = await this._driverService.deleteDriver(carpoolId, driverId);
        this._carpoolGateway.emitDriverRemoved(mapDriverToDto(driver));
    }
}

import {
    ApiOperation,
    ApiUseTags,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiResponse,
} from "@nestjs/swagger";
import { Post, Body, Controller, Param, UseGuards, Req, HttpStatus, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserRequest } from "../interfaces";
import { UpsertDriverDto, DriverDto } from "../dtos";
import { DriverService } from "../services";
import { CarpoolGateway } from "src/gateways";

@ApiUseTags("Drivers")
@ApiBearerAuth()
@Controller("api/v1/carpools/:id/drivers")
export class DriverController {
    public constructor(
        private readonly _driverService: DriverService,
        private readonly _carpoolGateway: CarpoolGateway
    ) {}

    @ApiOperation({
        operationId: "createDriver",
        title: "Create Driver",
        description: "Create a driver for a carpool",
    })
    @ApiCreatedResponse({ type: DriverDto })
    @UseGuards(AuthGuard("jwt"))
    @Post()
    public async createDriver(
        @Req() request: UserRequest,
        @Param("id") id: string,
        @Body() createDriverDto: UpsertDriverDto
    ): Promise<DriverDto> {
        const driver = await this._driverService.createDriver(id, request.user.id, createDriverDto);
        await this._carpoolGateway.emitDriverAdded(driver);
        return driver;
    }

    @ApiOperation({
        operationId: "getDrivers",
        title: "Get Drivers",
        description: "Get all the drivers signed up for a carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: DriverDto, isArray: true })
    @UseGuards(AuthGuard("jwt"))
    @Get()
    public async getDrivers(@Param("id") id: string): Promise<DriverDto[]> {
        return await this._driverService.findDriversByCarpoolId(id);
    }
}

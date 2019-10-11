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
import { DriverDto } from "../dtos";
import { Driver } from "../entities";
import { DriverService } from "../services";

@ApiUseTags("Drivers")
@ApiBearerAuth()
@Controller("api/v1/carpools/:id/drivers")
export class DriverController {
    public constructor(private readonly _driverService: DriverService) {}

    @ApiOperation({
        operationId: "createDriver",
        title: "Create Driver",
        description: "Create a driver for a carpool",
    })
    @ApiCreatedResponse({ type: Driver })
    @UseGuards(AuthGuard("jwt"))
    @Post()
    public async createDriver(
        @Req() request: UserRequest,
        @Param("id") id: string,
        @Body() driverDto: DriverDto
    ): Promise<Driver> {
        return await this._driverService.createDriver(id, request.user.id, driverDto);
    }

    @ApiOperation({
        operationId: "getDrivers",
        title: "Get Drivers",
        description: "Get all the drivers signed up for a carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: Driver, isArray: true })
    @Get()
    public async getDrivers(@Param("id") id: string): Promise<Driver[]> {
        return await this._driverService.findDriversByCarpoolId(id);
    }
}

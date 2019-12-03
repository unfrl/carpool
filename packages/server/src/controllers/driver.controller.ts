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
import { UpsertDriverDto, DriverDto, DriverMetadataDto } from "../dtos";
import { DriverService } from "../services";

@ApiUseTags("Drivers")
@ApiBearerAuth()
@Controller("api/v1/carpools/:id/drivers")
export class DriverController {
    public constructor(private readonly _driverService: DriverService) { }

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
        return await this._driverService.createDriver(id, request.user.id, createDriverDto);
    }

    @ApiOperation({
        operationId: "getDrivers",
        title: "Get Drivers",
        description: "Get all the drivers signed up for a carpool",
    })
    @UseGuards(AuthGuard("jwt"))
    @ApiResponse({ status: HttpStatus.OK, type: DriverDto, isArray: true })
    @Get()
    public async getDrivers(@Param("id") id: string): Promise<DriverDto[]> {
        return await this._driverService.findDriversByCarpoolId(id);
    }

    @ApiOperation({
        operationId: "getDriversMetadata",
        title: "Get Drivers Metadata",
        description: "Get the number of drivers and available seats for a carpool",
    })
    @ApiResponse({ status: HttpStatus.OK, type: DriverMetadataDto, isArray: true })
    @Get("metadata")
    public async getDriversMetadata(@Param("id") id: string): Promise<DriverMetadataDto> {
        return await this._driverService.findDriverMetadataByCarpoolId(id);
    }
}

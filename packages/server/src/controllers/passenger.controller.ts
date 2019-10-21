import {
    ApiOperation,
    ApiUseTags,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiResponse,
} from "@nestjs/swagger";
import { Post, Body, Controller, Param, UseGuards, Req, HttpStatus, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { CreatePassengerDto, PassengerDto } from "../dtos";
import { UserRequest } from "../interfaces";
import { PassengerService, DriverService } from "../services";
import { CarpoolGateway } from "../gateways";

@ApiUseTags("Passengers")
@ApiBearerAuth()
@Controller("api/v1/drivers/:id/passengers")
export class PassengerController {
    public constructor(
        private readonly _passengerService: PassengerService,
        private readonly _driverService: DriverService,
        private readonly _carpoolGateway: CarpoolGateway
    ) {}

    @ApiOperation({
        operationId: "createPassenger",
        title: "Create Passenger",
        description: "Creates a passenger based off the current user ",
    })
    @ApiCreatedResponse({ type: PassengerDto })
    @UseGuards(AuthGuard("jwt"))
    @Post()
    public async createPassenger(
        @Req() request: UserRequest,
        @Param("id") id: string,
        @Body() createPassengerDto: CreatePassengerDto
    ): Promise<PassengerDto> {
        const passenger = await this._passengerService.createPassenger(
            request.user.id,
            id,
            createPassengerDto
        );

        await this.notifyDriverUpdated(passenger.driverId);

        return passenger;
    }

    @ApiOperation({
        operationId: "getPassengers",
        title: "Get Passengers",
        description: "Get passengers for a driver",
    })
    @ApiResponse({ status: HttpStatus.OK, type: PassengerDto, isArray: true })
    @UseGuards(AuthGuard("jwt"))
    @Get()
    public async getPassengers(
        @Req() request: UserRequest,
        @Param("id") id: string
    ): Promise<PassengerDto[]> {
        return await this._passengerService.getPassengers(request.user.id, id);
    }

    private async notifyDriverUpdated(driverId: string) {
        const driver = await this._driverService.findOneById(driverId);
        this._carpoolGateway.emitDriverUpdated(driver);
    }
}

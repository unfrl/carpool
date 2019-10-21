import { ApiOperation, ApiUseTags, ApiCreatedResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Post, Body, Controller, Param, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { Passenger } from "../entities";
import { CreatePassengerDto, CreateUserPassengerDto } from "../dtos";
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
        description: "Creates a passenger for a driver",
    })
    @ApiCreatedResponse({ type: Passenger })
    @Post()
    public async createPassenger(
        @Param("id") id: string,
        @Body() createPassengerDto: CreatePassengerDto
    ): Promise<Passenger> {
        const passenger = await this._passengerService.createPassenger(id, createPassengerDto);

        await this.notifyDriverUpdated(passenger.driverId);

        return passenger;
    }

    @ApiOperation({
        operationId: "createUserPassenger",
        title: "Create User Passenger",
        description: "Creates a passenger based off the current user for a driver",
    })
    @ApiCreatedResponse({ type: Passenger })
    @UseGuards(AuthGuard("jwt"))
    @Post("me")
    public async createUserPassenger(
        @Req() request: UserRequest,
        @Param("id") id: string,
        @Body() createUserPassengerDto: CreateUserPassengerDto
    ): Promise<Passenger> {
        const passenger = await this._passengerService.createUserPassenger(
            request.user.id,
            id,
            createUserPassengerDto
        );

        await this.notifyDriverUpdated(passenger.driverId);

        return passenger;
    }

    private async notifyDriverUpdated(driverId: string) {
        const driver = await this._driverService.findOneById(driverId);
        this._carpoolGateway.emitDriverUpdated(driver);
    }
}

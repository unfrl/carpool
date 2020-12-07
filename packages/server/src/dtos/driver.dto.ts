import { ApiResponseProperty } from "@nestjs/swagger";

import { Car } from "../interfaces";
import { UserDto } from "./";
import { PassengerDto } from "./passenger.dto";

export class DriverDto {
    @ApiResponseProperty()
    public readonly id: string;

    @ApiResponseProperty()
    public readonly car: Car;

    @ApiResponseProperty()
    public readonly carpoolId: string;

    @ApiResponseProperty()
    public readonly user: UserDto;

    @ApiResponseProperty()
    public readonly seatsRemaining: number;

    @ApiResponseProperty()
    public readonly passengerUserIds: string[];

    @ApiResponseProperty({ type: [PassengerDto] })
    public passengers?: PassengerDto[]
}

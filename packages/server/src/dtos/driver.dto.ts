import { ApiResponseModelProperty } from "@nestjs/swagger";

import { Car } from "../interfaces";
import { UserDto } from "./";
import { PassengerDto } from "./passenger.dto";

export class DriverDto {
    @ApiResponseModelProperty()
    public readonly id: string;

    @ApiResponseModelProperty()
    public readonly car: Car;

    @ApiResponseModelProperty()
    public readonly carpoolId: string;

    @ApiResponseModelProperty()
    public readonly user: UserDto;

    @ApiResponseModelProperty()
    public readonly seatsRemaining: number;

    @ApiResponseModelProperty()
    public readonly passengerUserIds: string[];

    @ApiResponseModelProperty({ type: [PassengerDto] })
    public passengers?: PassengerDto[]
}

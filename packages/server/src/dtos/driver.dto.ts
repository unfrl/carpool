import { ApiResponseModelProperty } from "@nestjs/swagger";

import { Car } from "../interfaces";
import { UserDto } from "./user.dto";
import { Passenger } from "../entities";

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

    // TODO: THIS IS TEMPORARY! Remove this or replace it with an acceptable passenger DTO!
    @ApiResponseModelProperty()
    public readonly passengers: Passenger[];
}

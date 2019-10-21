import { ApiResponseModelProperty } from "@nestjs/swagger";

import { Car } from "../interfaces";
import { UserDto } from "./";

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
}

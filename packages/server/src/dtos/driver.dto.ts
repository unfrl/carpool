import { ApiProperty } from "@nestjs/swagger";

import { Car } from "../interfaces";
import { UserDto } from "./";
import { PassengerDto } from "./passenger.dto";

export class DriverDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public car: Car;

    @ApiProperty()
    public carpoolId: string;

    @ApiProperty()
    public user: UserDto;

    @ApiProperty()
    public seatsRemaining: number;

    @ApiProperty()
    public passengerUserIds: string[];

    @ApiProperty({ type: [PassengerDto] })
    public passengers?: PassengerDto[];
}

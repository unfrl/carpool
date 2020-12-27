import { ApiProperty } from "@nestjs/swagger";

import { Car } from "../interfaces";
import { UserDto } from "./";
import { PassengerDto } from "./passenger.dto";

export class DriverDto {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly car: Car;

    @ApiProperty()
    public readonly carpoolId: string;

    @ApiProperty()
    public readonly user: UserDto;

    @ApiProperty()
    public readonly seatsRemaining: number;

    @ApiProperty()
    public readonly passengerUserIds: string[];

    @ApiProperty({ type: [PassengerDto] })
    public passengers?: PassengerDto[];
}

import { ApiProperty } from "@nestjs/swagger";

import { UserDto } from "./user.dto";

export class PassengerDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public phoneNumber: string;

    @ApiProperty()
    public address: string;

    @ApiProperty()
    public user: UserDto;

    @ApiProperty()
    public driverId: string;
}

import { ApiResponseProperty } from "@nestjs/swagger";

import { UserDto } from "./user.dto";

export class PassengerDto {
    @ApiResponseProperty()
    public id: string;

    @ApiResponseProperty()
    public phoneNumber: string;

    @ApiResponseProperty()
    public address: string;

    @ApiResponseProperty()
    public user: UserDto;

    @ApiResponseProperty()
    public driverId: string;
}

import { ApiResponseProperty } from "@nestjs/swagger";

import { UserDto } from "./user.dto";

export class PassengerDto {
    @ApiResponseProperty()
    public readonly id: string;

    @ApiResponseProperty()
    public readonly phoneNumber: string;

    @ApiResponseProperty()
    public readonly address: string;

    @ApiResponseProperty()
    public readonly user: UserDto;

    @ApiResponseProperty()
    public readonly driverId: string;
}

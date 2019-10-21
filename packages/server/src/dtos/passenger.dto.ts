import { ApiResponseModelProperty } from "@nestjs/swagger";

import { UserDto } from "./user.dto";

export class PassengerDto {
    @ApiResponseModelProperty()
    public readonly id: string;

    @ApiResponseModelProperty()
    public readonly phoneNumber: string;

    @ApiResponseModelProperty()
    public readonly address: string;

    @ApiResponseModelProperty()
    public readonly user: UserDto;

    @ApiResponseModelProperty()
    public readonly driverId: string;
}

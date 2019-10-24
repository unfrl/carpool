import { ApiResponseModelProperty } from "@nestjs/swagger";

import { UserDto } from ".";

export class CarpoolDto {
    @ApiResponseModelProperty()
    public readonly id: string;

    @ApiResponseModelProperty()
    public readonly name: string;

    @ApiResponseModelProperty()
    public readonly urlId: string;

    @ApiResponseModelProperty()
    public readonly destination: string;

    @ApiResponseModelProperty()
    public readonly dateTime: Date;

    @ApiResponseModelProperty()
    public readonly created: Date;

    @ApiResponseModelProperty()
    public readonly updated: Date;

    @ApiResponseModelProperty()
    public readonly user: UserDto;
}

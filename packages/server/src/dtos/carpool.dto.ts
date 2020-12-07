import { ApiResponseProperty } from "@nestjs/swagger";

import { UserDto } from ".";
import { CarpoolMetadataDto } from "./carpool.metadata.dto";

export class CarpoolDto {
    @ApiResponseProperty()
    public readonly id: string;

    @ApiResponseProperty()
    public readonly name: string;

    @ApiResponseProperty()
    public readonly description: string;

    @ApiResponseProperty()
    public readonly urlId: string;

    @ApiResponseProperty()
    public readonly destination: string;

    @ApiResponseProperty()
    public readonly dateTime: Date;

    @ApiResponseProperty()
    public readonly created: Date;

    @ApiResponseProperty()
    public readonly updated: Date;

    @ApiResponseProperty()
    public readonly user: UserDto;

    @ApiResponseProperty()
    public metadata?: CarpoolMetadataDto;
}

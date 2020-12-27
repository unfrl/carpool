import { ApiProperty } from "@nestjs/swagger";

import { UserDto } from ".";
import { CarpoolMetadataDto } from "./carpool.metadata.dto";

export class CarpoolDto {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly description: string;

    @ApiProperty()
    public readonly urlId: string;

    @ApiProperty()
    public readonly destination: string;

    @ApiProperty()
    public readonly dateTime: Date;

    @ApiProperty()
    public readonly created: Date;

    @ApiProperty()
    public readonly updated: Date;

    @ApiProperty()
    public readonly user: UserDto;

    @ApiProperty()
    public metadata?: CarpoolMetadataDto;
}

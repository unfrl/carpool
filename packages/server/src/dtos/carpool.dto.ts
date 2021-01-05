import { ApiProperty } from "@nestjs/swagger";

import { UserDto } from ".";
import { CarpoolMetadataDto } from "./carpool.metadata.dto";

export class CarpoolDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public description: string;

    @ApiProperty()
    public urlId: string;

    @ApiProperty()
    public destination: string;

    @ApiProperty()
    public dateTime: Date;

    @ApiProperty()
    public created: Date;

    @ApiProperty()
    public updated: Date;

    @ApiProperty()
    public user: UserDto;

    @ApiProperty()
    public metadata?: CarpoolMetadataDto;
}

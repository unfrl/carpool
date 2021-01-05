import { ApiProperty } from "@nestjs/swagger";

export class CarpoolMetadataDto {
    @ApiProperty()
    public seatsRemaining: number;

    @ApiProperty()
    public driverCount: number;
}

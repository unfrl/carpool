import { ApiResponseProperty, ApiProperty } from "@nestjs/swagger";

export class CarpoolMetadataDto {
    @ApiResponseProperty()
    public seatsRemaining: number;

    @ApiResponseProperty()
    public driverCount: number;
}

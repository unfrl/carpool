import { ApiResponseModelProperty } from "@nestjs/swagger";

export class DriverMetadataDto {
    @ApiResponseModelProperty()
    public readonly driverCount: number;

    @ApiResponseModelProperty()
    public readonly remainingSeats: number;
}
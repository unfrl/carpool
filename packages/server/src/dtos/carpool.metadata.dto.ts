import { ApiResponseModelProperty, ApiModelProperty } from "@nestjs/swagger";

export class CarpoolMetadataDto {
    @ApiResponseModelProperty()
    public seatsRemaining: number;

    @ApiResponseModelProperty()
    public driverCount: number;
}

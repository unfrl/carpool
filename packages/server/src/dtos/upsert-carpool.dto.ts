import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Length, IsDefined, IsDateString, IsOptional } from "class-validator";

export class UpsertCarpoolDto {
    @ApiModelProperty()
    @Length(5, 50)
    public readonly carpoolName: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    public readonly description: string;

    @ApiModelProperty()
    @IsDefined()
    public readonly destination: string;

    @ApiModelProperty()
    @IsDateString()
    @IsDefined()
    public readonly dateTime: Date;
}

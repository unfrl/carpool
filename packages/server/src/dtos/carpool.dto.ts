import { ApiModelProperty } from "@nestjs/swagger";
import { Length, IsDefined, IsDateString } from "class-validator";

export class CarpoolDto {
    @ApiModelProperty()
    @Length(5, 50)
    public readonly carpoolName: string;

    @ApiModelProperty()
    @IsDefined()
    public readonly destination: string;

    @ApiModelProperty()
    @IsDateString()
    @IsDefined()
    public readonly dateTime: Date;
}

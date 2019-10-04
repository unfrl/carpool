import { ApiModelProperty } from "@nestjs/swagger";
import { Length, IsDateString, IsDefined } from "class-validator";

export class CreateEventDto {
    @ApiModelProperty()
    @Length(5, 50)
    @IsDefined()
    public readonly eventName: string;

    @ApiModelProperty()
    @IsDateString()
    @IsDefined()
    public readonly dateTime: Date;
}

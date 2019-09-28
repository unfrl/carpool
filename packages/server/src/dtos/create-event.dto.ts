import { ApiModelProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CreateEventDto {
    @ApiModelProperty()
    @Length(5, 50)
    public readonly eventName: string;

    @ApiModelProperty()
    public readonly dateTime: Date;
}

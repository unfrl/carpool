import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { Length } from "class-validator";

export class UpdateEventDto {
    @ApiModelPropertyOptional()
    @Length(5, 50)
    public readonly eventName?: string;

    @ApiModelPropertyOptional()
    public readonly dateTime?: Date;
}

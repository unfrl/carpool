import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { Length, IsOptional, IsDate, IsDefined } from "class-validator";

export class UpdateEventDto {
    @ApiModelPropertyOptional()
    @Length(5, 50)
    @IsOptional()
    public readonly eventName?: string;

    @ApiModelPropertyOptional()
    @IsDate()
    @IsOptional()
    public readonly dateTime?: Date;
}

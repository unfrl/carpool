import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { Length, IsOptional } from "class-validator";
import { Address } from "../interfaces";
import { Passenger, Driver } from "../entities";

export class UpdateCarpoolDto {
    @ApiModelPropertyOptional()
    @Length(5, 50)
    @IsOptional()
    public readonly carpoolName?: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    public readonly destination?: Address;

    @ApiModelPropertyOptional()
    @IsOptional()
    public drivers?: Driver[];

    @ApiModelPropertyOptional()
    @IsOptional()
    public passengers?: Passenger[];
}

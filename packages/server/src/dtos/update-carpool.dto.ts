import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { Length } from "class-validator";
import { Address } from "../interfaces";
import { Passenger, Driver } from "../entities";

export class UpdateCarpoolDto {
    @ApiModelPropertyOptional()
    @Length(5, 50)
    public readonly carpoolName?: string;

    @ApiModelPropertyOptional()
    public readonly destination?: Address;

    @ApiModelPropertyOptional()
    public drivers?: Driver[];

    @ApiModelPropertyOptional()
    public passengers?: Passenger[];
}

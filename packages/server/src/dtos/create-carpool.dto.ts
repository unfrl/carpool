import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Length } from "class-validator";

import { Address } from "../interfaces";

export class CreateCarpoolDto {
    @ApiModelPropertyOptional()
    @Length(5, 50)
    public readonly carpoolName?: string;

    @ApiModelProperty()
    public readonly destination: Address;

    @ApiModelProperty()
    public readonly eventId: string;
}

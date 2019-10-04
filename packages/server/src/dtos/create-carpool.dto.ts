import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Length, IsDefined, IsOptional } from "class-validator";

import { Address } from "../interfaces";

export class CreateCarpoolDto {
    @ApiModelPropertyOptional()
    @IsOptional()
    @Length(5, 50)
    public readonly carpoolName?: string;

    @ApiModelProperty()
    @IsDefined()
    public readonly destination: Address;

    @ApiModelProperty()
    @IsDefined()
    public readonly eventId: string;
}

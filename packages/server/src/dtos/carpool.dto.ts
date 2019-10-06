import { ApiModelProperty } from "@nestjs/swagger";
import { Length, IsDefined, IsDateString } from "class-validator";

import { Address } from "../interfaces";

export class CarpoolDto {
    @ApiModelProperty()
    @Length(5, 50)
    public readonly carpoolName: string;

    @ApiModelProperty()
    @IsDefined()
    public readonly destination: Address;

    @ApiModelProperty()
    @IsDateString()
    @IsDefined()
    public readonly dateTime: Date;
}

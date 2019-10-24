import { ApiModelProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

import { Car } from "../interfaces";

export class UpsertDriverDto {
    @ApiModelProperty()
    @IsDefined()
    public readonly car: Car;
}

import { ApiModelProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

import { Car } from "../interfaces";

export class DriverDto {
    @ApiModelProperty()
    @IsDefined()
    public readonly car: Car;
}

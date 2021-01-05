import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

import { Car } from "../interfaces";

export class UpsertDriverDto {
    @ApiProperty()
    @IsDefined()
    public car: Car;
}

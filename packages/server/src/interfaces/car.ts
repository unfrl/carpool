import { ApiModelProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

export enum CarType {
    sedan = "sedan",
    truck = "truck",
    suv = "suv",
    van = "van",
}

export class Car {
    @ApiModelProperty()
    @IsDefined()
    public capacity: number;

    @ApiModelProperty()
    @IsDefined()
    public color: string;

    // Note: this repition is necessary for swagger: https://docs.nestjs.com/recipes/swagger#working-with-enums
    @ApiModelProperty({ enum: ["sedan", "truck", "suv", "van"] })
    @IsDefined()
    public type: CarType;
}

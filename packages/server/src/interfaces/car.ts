import { ApiModelProperty } from "@nestjs/swagger";

export enum CarType {
    sedan = "sedan",
    truck = "truck",
    suv = "suv",
    van = "van",
}

export class Car {
    @ApiModelProperty()
    public capacity: number;

    @ApiModelProperty()
    public color: string;

    // Note: this repition is necessary for swagger: https://docs.nestjs.com/recipes/swagger#working-with-enums
    @ApiModelProperty({ enum: ["sedan", "truck", "suv", "van"] })
    public type: CarType;
}

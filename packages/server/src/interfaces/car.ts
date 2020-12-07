import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

export enum CarType {
    sedan = "sedan",
    truck = "truck",
    suv = "suv",
    van = "van",
}

export class Car {
    @ApiProperty()
    @IsDefined()
    public capacity: number;

    @ApiProperty()
    @IsDefined()
    public color: string;

    // Note: this repition is necessary for swagger: https://docs.nestjs.com/recipes/swagger#working-with-enums
    @ApiProperty({ enum: ["sedan", "truck", "suv", "van"] })
    @IsDefined()
    public type: CarType;
}

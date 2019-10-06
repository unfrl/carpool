import { Entity, OneToMany, ManyToOne, Column } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Driver } from "./driver.entity";
import { Address } from "../interfaces";
import { ApiResponseModelProperty } from "@nestjs/swagger";

@Entity()
export class Carpool extends BaseEntity {
    @Column({ length: 50 })
    @ApiResponseModelProperty()
    public name: string;

    @Column("jsonb")
    @ApiResponseModelProperty()
    public destination: Address;

    @Column()
    @ApiResponseModelProperty()
    public dateTime: Date;

    @OneToMany(type => Driver, driver => driver.carpool)
    @ApiResponseModelProperty()
    public drivers: Driver[];
}

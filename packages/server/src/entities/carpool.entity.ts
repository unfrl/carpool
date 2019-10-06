import { Entity, OneToMany, ManyToOne, Column } from "typeorm";
import { ApiResponseModelProperty } from "@nestjs/swagger";

import { BaseEntity } from "./base.entity";
import { Driver } from "./driver.entity";
import { User } from "./user.entity";
import { Address } from "../interfaces";

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

    @Column()
    @ApiResponseModelProperty()
    public createdById: string;

    @Column()
    @ApiResponseModelProperty()
    public updatedById: string;

    @ManyToOne(type => User)
    public createdBy: User;

    @ManyToOne(type => User)
    public updatedBy: User;
}

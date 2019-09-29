import { Entity, Column, OneToMany } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Carpool } from "./carpool.entity";
import { ApiResponseModelProperty } from "@nestjs/swagger";

@Entity()
export class Event extends BaseEntity {
    @Column("varchar", { length: 50 })
    @ApiResponseModelProperty()
    public name: string;

    @Column()
    @ApiResponseModelProperty()
    public dateTime: Date;

    @OneToMany(type => Carpool, carpool => carpool.event)
    @ApiResponseModelProperty()
    public carpools: Carpool[];
}

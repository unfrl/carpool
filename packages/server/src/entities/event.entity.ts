import { Entity, Column, OneToMany } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Carpool } from "./carpool.entity";

@Entity()
export class Event extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public dateTime: Date;

    @OneToMany(type => Carpool, carpool => carpool.event)
    public carpools: Carpool[];
}

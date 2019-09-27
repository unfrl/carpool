import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Carpool } from "./carpool.entity";

@Entity()
export class Event extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public destination: string;

    @Column()
    public dateTime: Date;

    @ManyToOne(type => Carpool, carpool => carpool.event)
    public carpools: Carpool[];
}

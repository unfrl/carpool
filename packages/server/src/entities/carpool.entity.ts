import { Entity, OneToMany, ManyToOne, Column } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Driver } from "./driver.entity";
import { Passenger } from "./passenger.entity";
import { Event } from "./event.entity";
import { Address } from "../interfaces";
import { ApiResponseModelProperty } from "@nestjs/swagger";

@Entity()
export class Carpool extends BaseEntity {
    @Column({ nullable: true, length: 50 })
    @ApiResponseModelProperty()
    public name: string;

    @Column("jsonb")
    @ApiResponseModelProperty()
    public destination: Address;

    @Column()
    @ApiResponseModelProperty()
    public eventId: string;

    @ManyToOne(type => Event)
    public event: Event;

    @OneToMany(type => Driver, driver => driver.carpool)
    @ApiResponseModelProperty()
    public drivers: Driver[];

    @OneToMany(type => Passenger, passenger => passenger.carpool)
    @ApiResponseModelProperty()
    public passengers: Passenger[];
}

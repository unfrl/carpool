import { Entity, ManyToOne, OneToMany, Column } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Carpool } from "./carpool.entity";
import { User } from "./user.entity";
import { Passenger } from "./passenger.entity";
import { Car } from "../interfaces";

@Entity()
export class Driver extends BaseEntity {
    @Column()
    public userId: string;

    @ManyToOne(type => User)
    public user: User;

    @Column("jsonb")
    public car: Car;

    @Column()
    public carpoolId: string;

    @ManyToOne(type => Carpool, carpool => carpool.drivers)
    public carpool: Carpool;

    @OneToMany(type => Passenger, passenger => passenger.driver)
    public passengers: Passenger[];
}

import { Entity, ManyToOne, Column } from "typeorm";

import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Carpool } from "./carpool.entity";
import { Address } from "../interfaces";

@Entity()
export class Passenger extends BaseEntity {
    @Column({ nullable: true })
    public userId: string;

    @ManyToOne(type => User)
    public user: User;

    // TODO: name, email, and phonenumber can be pulled from the user record if they're logged in

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column({ nullable: true })
    public phoneNumber: string;

    @Column("jsonb")
    public address: Address;

    @Column()
    public carpoolId: string;

    @ManyToOne(type => Carpool)
    public carpool: Carpool;
}

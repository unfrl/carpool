import { Entity, ManyToOne, Column } from "typeorm";

import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Driver } from "./driver.entity";

@Entity()
export class Passenger extends BaseEntity {
    @Column()
    public userId: string;

    @ManyToOne(type => User)
    public user: User;

    @Column({ nullable: true })
    public phoneNumber: string;

    @Column()
    public address: string;

    @Column()
    public driverId: string;

    @ManyToOne(type => Driver, driver => driver.passengers)
    public driver: Driver;
}

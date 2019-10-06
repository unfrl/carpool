import { Entity, ManyToOne, Column } from "typeorm";
import { ApiResponseModelProperty } from "@nestjs/swagger";

import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Driver } from "./driver.entity";
import { Address } from "../interfaces";

@Entity()
export class Passenger extends BaseEntity {
    @Column({ nullable: true })
    @ApiResponseModelProperty()
    public userId: string;

    @ManyToOne(type => User)
    public user: User;

    // TODO: name, email, and phonenumber can be pulled from the user record if they're logged in

    @Column()
    @ApiResponseModelProperty()
    public name: string;

    @Column()
    @ApiResponseModelProperty()
    public email: string;

    @Column({ nullable: true })
    @ApiResponseModelProperty()
    public phoneNumber: string;

    @Column("jsonb")
    @ApiResponseModelProperty()
    public address: Address;

    @Column()
    @ApiResponseModelProperty()
    public driverId: string;

    @ManyToOne(type => Driver, driver => driver.passengers)
    public driver: Driver;
}

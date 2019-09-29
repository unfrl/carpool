import { Entity, ManyToOne, Column } from "typeorm";

import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Carpool } from "./carpool.entity";
import { Address } from "../interfaces";
import { ApiResponseModelProperty } from "@nestjs/swagger";

@Entity()
export class Passenger extends BaseEntity {
    @Column({ nullable: true })
    @ApiResponseModelProperty()
    public userId: string;

    @ManyToOne(type => User)
    @ApiResponseModelProperty()
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
    public carpoolId: string;

    @ManyToOne(type => Carpool)
    @ApiResponseModelProperty()
    public carpool: Carpool;
}

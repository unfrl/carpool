import { Entity, ManyToOne, Column } from "typeorm";
import { ApiResponseModelProperty } from "@nestjs/swagger";

import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Driver } from "./driver.entity";

@Entity()
export class Passenger extends BaseEntity {
    @Column({ nullable: true })
    @ApiResponseModelProperty()
    public userId: string;

    @ManyToOne(type => User)
    public user: User;

    @Column()
    @ApiResponseModelProperty()
    public name: string;

    @Column()
    @ApiResponseModelProperty()
    public email: string;

    @Column({ nullable: true })
    @ApiResponseModelProperty()
    public phoneNumber: string;

    @Column()
    @ApiResponseModelProperty()
    public address: string;

    @Column()
    @ApiResponseModelProperty()
    public driverId: string;

    @ManyToOne(type => Driver, driver => driver.passengers)
    public driver: Driver;
}

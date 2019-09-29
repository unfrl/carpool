import { Entity, ManyToOne, Column } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Carpool } from "./carpool.entity";
import { User } from "./user.entity";
import { Car } from "../interfaces";
import { ApiResponseModelProperty } from "@nestjs/swagger";

@Entity()
export class Driver extends BaseEntity {
    @Column()
    @ApiResponseModelProperty()
    public userId: string;

    @ManyToOne(type => User)
    @ApiResponseModelProperty()
    public user: User;

    @Column("jsonb")
    @ApiResponseModelProperty()
    public car: Car;

    @Column()
    @ApiResponseModelProperty()
    public carpoolId: string;

    @ManyToOne(type => Carpool)
    @ApiResponseModelProperty()
    public carpool: Carpool;
}

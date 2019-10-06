import { Entity, Column, OneToMany } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Driver } from "./driver.entity";
import { Passenger } from "./passenger.entity";
import { ApiResponseModelProperty } from "@nestjs/swagger";

@Entity()
export class User extends BaseEntity {
    @Column({ nullable: true })
    @ApiResponseModelProperty()
    public firstName: string;

    @Column({ nullable: true })
    @ApiResponseModelProperty()
    public lastName: string;

    @Column({ length: 50 })
    @ApiResponseModelProperty()
    public displayName: string;

    @Column({ unique: true })
    @ApiResponseModelProperty()
    public email: string;

    @Column()
    @ApiResponseModelProperty()
    public password: string;
}

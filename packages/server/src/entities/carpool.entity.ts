import { Entity, OneToMany, ManyToOne, Column, BeforeInsert } from "typeorm";
import { ApiResponseModelProperty } from "@nestjs/swagger";
import * as shortid from "shortid";

import { BaseEntity } from "./base.entity";
import { Driver } from "./driver.entity";
import { User } from "./user.entity";

@Entity()
export class Carpool extends BaseEntity {
    @Column({ length: 50 })
    @ApiResponseModelProperty()
    public name: string;

    @Column({ length: 14, unique: true })
    @ApiResponseModelProperty()
    public urlId: string;

    @Column()
    @ApiResponseModelProperty()
    public destination: string;

    @Column()
    @ApiResponseModelProperty()
    public dateTime: Date;

    @OneToMany(type => Driver, driver => driver.carpool)
    @ApiResponseModelProperty()
    public drivers: Driver[];

    @Column()
    @ApiResponseModelProperty()
    public createdById: string;

    @Column()
    @ApiResponseModelProperty()
    public updatedById: string;

    @ManyToOne(type => User)
    public createdBy: User;

    @ManyToOne(type => User)
    public updatedBy: User;

    @BeforeInsert()
    private beforeInsert() {
        this.urlId = shortid.generate();
    }
}

import { Entity, OneToMany, ManyToOne, Column, BeforeInsert } from "typeorm";
import * as shortid from "shortid";

import { BaseEntity } from "./base.entity";
import { Driver } from "./driver.entity";
import { User } from "./user.entity";

@Entity()
export class Carpool extends BaseEntity {
    @Column({ length: 50 })
    public name: string;

    @Column({ length: 14, unique: true })
    public urlId: string;

    @Column()
    public destination: string;

    @Column()
    public dateTime: Date;

    @OneToMany(type => Driver, driver => driver.carpool)
    public drivers: Driver[];

    @Column()
    public createdById: string;

    @Column()
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

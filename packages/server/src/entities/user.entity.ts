import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Driver } from './driver.entity';
import { Passenger } from './passenger.entity';

@Entity()
export class User extends BaseEntity {
    @Column({ nullable: true })
    public firstName: string;

    @Column({ nullable: true })
    public lastName: string;

    @Column({ length: 50 })
    public displayName: string;

    @Column({ unique: true })
    public email: string;

    @Column()
    public password: string;

    @OneToMany(type => Driver, driver => driver.carpool)
    public drivers: Driver[];

    @OneToMany(type => Passenger, passenger => passenger.carpool)
    public passengers: Passenger[];
}

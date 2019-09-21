import { Entity, ManyToOne, Column } from 'typeorm';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Carpool } from './carpool.entity';

@Entity()
export class Passenger extends BaseEntity {
    @Column()
    public userId: string;

    @ManyToOne(type => User)
    public user: User;

    @Column()
    public carpoolId: string;

    @ManyToOne(type => Carpool)
    public carpool: Carpool;
}

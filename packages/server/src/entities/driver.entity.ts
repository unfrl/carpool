import { Entity, ManyToOne, Column } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Carpool } from './carpool.entity';
import { User } from './user.entity';

@Entity()
export class Driver extends BaseEntity {
    @Column()
    public userId: string;

    @ManyToOne(type => User)
    public user: User;

    @Column()
    public carpoolId: string;

    @ManyToOne(type => Carpool)
    public carpool: Carpool;
}

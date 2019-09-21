import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Organization } from './organization.entity';
import { Carpool } from './carpool.entity';

@Entity()
export class Event extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public destination: string;

    @Column()
    public dateTime: Date;

    @ManyToOne(type => Carpool, carpool => carpool.event)
    public carpools: Carpool[];

    @Column({ nullable: true })
    public organizationId: string;

    @ManyToOne(type => Organization)
    public organization: Organization;
}

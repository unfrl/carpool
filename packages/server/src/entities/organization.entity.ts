import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Event } from './event.entity';

@Entity()
export class Organization extends BaseEntity {
    @Column({ nullable: true, length: 200 })
    public name: string;

    @Column({ nullable: true })
    public logo: string;

    @OneToMany(type => Event, event => event.organization)
    public events: Event[];
}

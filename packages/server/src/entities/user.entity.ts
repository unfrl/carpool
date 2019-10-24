import { Entity, Column } from "typeorm";

import { BaseEntity } from "./base.entity";

@Entity()
export class User extends BaseEntity {
    @Column({ nullable: true })
    public firstName: string;

    @Column({ nullable: true })
    public lastName: string;

    @Column({ length: 50, unique: true })
    public displayName: string;

    @Column({ unique: true })
    public email: string;

    @Column({ default: false })
    public isVerified: boolean;

    @Column({ nullable: true })
    public password: string;

    @Column({ nullable: true })
    public google_id: string;
}

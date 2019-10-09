import { Entity, Column } from "typeorm";

import { BaseEntity } from "./base.entity";
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

    @Column({ default: false })
    @ApiResponseModelProperty()
    public isVerified: boolean;

    @Column()
    @ApiResponseModelProperty()
    public password: string;
}

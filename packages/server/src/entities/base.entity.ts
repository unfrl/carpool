import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiResponseModelProperty } from "@nestjs/swagger";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @ApiResponseModelProperty()
    public id: string;

    @CreateDateColumn()
    @ApiResponseModelProperty()
    public created: Date;

    @UpdateDateColumn()
    @ApiResponseModelProperty()
    public updated: Date;
}

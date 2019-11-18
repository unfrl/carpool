import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiResponseModelProperty } from "@nestjs/swagger";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @ApiResponseModelProperty()
    public id: string;

    @CreateDateColumn({ type: "timestamp with time zone" })
    @ApiResponseModelProperty()
    public created: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    @ApiResponseModelProperty()
    public updated: Date;
}

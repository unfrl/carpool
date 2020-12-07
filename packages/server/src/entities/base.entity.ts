import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiResponseProperty } from "@nestjs/swagger";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @ApiResponseProperty()
    public id: string;

    @CreateDateColumn({ type: "timestamp with time zone" })
    @ApiResponseProperty()
    public created: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    @ApiResponseProperty()
    public updated: Date;
}

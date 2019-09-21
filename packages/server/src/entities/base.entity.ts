import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn()
    public created: Date;

    @UpdateDateColumn()
    public updated: Date;
}


import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity("pipeline_log")
export class Pipeline {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pipeline_id: string

    @Column()
    data_source: string

    @Column()
    project_id: number

    @Column()
    pipeline_name: string

    @Column()
    starting_time: Date

    @Column()
    ending_time: Date

    @Column()
    status: string

    @Column()
    is_active: boolean

    @Column()
    created_by: string

    @CreateDateColumn()
    created_date: Date

    @Column()
    last_updated_by: string

    @UpdateDateColumn()
    last_updated_date: Date
}







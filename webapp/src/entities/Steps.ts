import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity("pipeline_step_log")
export class Step  {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pipeline_log_id: number

    @Column()
    data_source: string

    @Column()
    pipeline_name: string

    @Column({type:"datetime2"})
    starting_time: Date

    @Column({type:"datetime2"})
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


import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity({ schema: "ctl", name:"project" })

export class Project  {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    project_name: string

    @Column()
    moody_project_id: string

    @Column()
    measurement_model: string

    @Column()
    start_date: Date

    @Column()
    end_date: Date

    @Column()
    created_by: string 

    @CreateDateColumn()
    created_date: Date

    @Column()
    last_updated_by: string 

    @UpdateDateColumn()
    last_updated_date: Date
    
}




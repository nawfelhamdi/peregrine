import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity({ schema: "hck", name:"dq_dashboard_health_status" })
export class Data  {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    column_name: string

    @Column()
    table_name: string

    @Column()
    rows: number

    @Column()
    missing: number

    @Column()
    distinct: number

    @Column()
    health_status: boolean

    @Column()
    created_by: string

    @CreateDateColumn({type:"datetime2"})
    created_date: Date

    @Column()
    last_updated_by: string

    @UpdateDateColumn({type:"datetime2"})
    last_updated_date: Date
}




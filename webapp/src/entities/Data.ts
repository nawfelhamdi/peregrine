import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity({ schema: "hck", name:"health_status_check" })
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
    health_status: number
}




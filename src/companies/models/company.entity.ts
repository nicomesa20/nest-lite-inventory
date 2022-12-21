import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ unique: true })
    public name: string;

    @Column()
    public address: string;

    @Column()
    public nit: string;

    @Column()
    public phone: string;
}
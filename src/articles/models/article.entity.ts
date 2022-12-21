import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn('uuid')
    public id: string;
    
    @Column()
    public name: string;

    @Column()
    public quantity: number;

    @Column()
    public description: string;

    @Column()
    public companyId: string;
}
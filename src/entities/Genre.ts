import {Entity, PrimaryGeneratedColumn, Column,ManyToMany, JoinTable} from 'typeorm';
import { Book } from './Book';

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @ManyToMany(() => Book)
    @JoinTable()
    books!: Book[]
}

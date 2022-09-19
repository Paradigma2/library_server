import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ nullable: true })
    public filename!: string;

    @OneToMany(() => Book, book => book.photo)
    public books!: Book[];

    @OneToMany(() => User, user => user.photo)
    public users!: User[];
}
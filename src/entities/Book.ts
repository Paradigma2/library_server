import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsEnum} from 'class-validator';
import {Photo} from './Photo'
import {Genre} from "./Genre";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public title!: string;

    @Column()
    public publisher!: string;

    @Column()
    public year!: number;

    @Column()
    public language!: string;

    @Column({ array: true })
    public authors!: string;

    @Column({ default: 0 })
    public stock!: number;

    @Column({ default: 0 })
    public averageScore!: number;

    @ManyToOne(() => Photo, photo => photo.books, { eager: true })
    public photo!: Photo | null;

    @ManyToMany(() => Genre, (genre) => genre.books, { eager: true })
    @JoinTable()
    genres!: Genre[];
}

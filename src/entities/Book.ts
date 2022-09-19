import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsEnum} from 'class-validator';
import {Photo} from './Photo'
import {Genre} from "./Genre";

export enum BookStatus {
    REQUESTED = 'pending',
    IN_STOCK = 'in_stock',
    OUT_OF_STOCK = 'out_of_stock'
}

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

    @Column({ default: BookStatus.OUT_OF_STOCK })
    @IsEnum(BookStatus)
    public status!: BookStatus;

    @ManyToOne(() => Photo, photo => photo.books)
    public photo!: Photo | null;

    @ManyToMany(() => Genre, (genre) => genre.books)
    genres!: Genre[];
}

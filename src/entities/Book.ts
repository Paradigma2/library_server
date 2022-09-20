import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Photo} from './Photo'
import {Genre} from "./Genre";
import {Review} from "./Review";
import {Lending} from "./Lending";

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

    @Column({type: "decimal", precision: 2, default: 0})
    public averageScore!: number;

    @ManyToOne(() => Photo, photo => photo.books, { eager: true })
    public photo!: Photo | null;

    @ManyToMany(() => Genre, (genre) => genre.books, { eager: true })
    @JoinTable()
    genres!: Genre[];

    @OneToMany(() => Review, review => review.book)
    public reviews!: Review[];

    @OneToMany(() => Lending, lending => lending.book)
    public lendings!: Lending[];
}

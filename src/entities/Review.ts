import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {Length, Max, Min} from "class-validator";
import {User} from "./User";
import {Book} from "./Book";

@Entity()
@Unique(['user', 'book'])
export class Review {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ nullable: true })
    @Length(0, 1000)
    public comment!: string;

    @Column({ nullable: true })
    @Min(1)
    @Max(10)
    public score!: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at!: Date;

    @UpdateDateColumn({ type: "timestamp", default: null, onUpdate: "CURRENT_TIMESTAMP(6)", nullable: true })
    public updated_at!: Date;

    @ManyToOne(() => User, user => user.reviews, { eager: true })
    public user!: User | null;

    @ManyToOne(() => Book, book => book.reviews, { eager: true })
    public book!: Book | null;
}
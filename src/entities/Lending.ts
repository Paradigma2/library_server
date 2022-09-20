import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Book} from "./Book";

@Entity()
export class Lending {
    @PrimaryGeneratedColumn()
    public id!: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at!: Date;

    @Column({ type: "timestamp", nullable: true })
    public lent_at!: Date;

    @Column({ type: "timestamp", nullable: true })
    public due_to!: Date;

    @Column({ type: "timestamp", nullable: true })
    public returned_at!: Date;

    @ManyToOne(() => User, user => user.lendings, { eager: true })
    public user!: User | null;

    @ManyToOne(() => Book, book => book.lendings, { eager: true })
    public book!: Book | null;
}
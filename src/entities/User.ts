import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {IsEmail, IsEnum, Length} from 'class-validator';
import {Photo} from "./Photo";
import {Review} from "./Review";
import {Lending} from "./Lending";

export enum UserRole {
    READER = 'reader',
    MOD = 'mod',
    ADMIN = 'admin'
}

export enum UserStatus {
    PENDING = 'pending',
    REGISTERED = 'registered',
    BLOCKED = 'blocked'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ unique: true })
    public username!: string;

    @Column({ unique: true })
    @IsEmail()
    public email!: string;

    @Column()
    @Length(8, 12)
    public password?: string;

    @Column()
    public phone!: string;

    @Column()
    public firstName!: string;

    @Column()
    public lastName!: string;

    @Column()
    public address!: string;

    @Column({ default: 0 })
    public lendings_count!: number;

    @Column()
    @IsEnum(UserRole)
    public role!: UserRole;

    @Column()
    @IsEnum(UserStatus)
    public status!: UserStatus;

    @ManyToOne(() => Photo, photo => photo.books, { eager: true })
    public photo!: Photo | null;

    @OneToMany(() => Review, review => review.user)
    public reviews!: Review[];

    @OneToMany(() => Lending, lending => lending.user)
    public lendings!: Lending[];
}

import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Config {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public lending_duration!: number;
}

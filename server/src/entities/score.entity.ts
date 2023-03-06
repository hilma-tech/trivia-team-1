import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from "typeorm";
import { Quiz } from "./quiz.entity";
import { User } from "./user.entity";
@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    score: string;

    @CreateDateColumn()
    date: Date;

    @Column()
    player: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.scores, {nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    quiz: Quiz;
}
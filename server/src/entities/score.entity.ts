import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Quiz } from "./quiz.entity";
import { User } from "./user.entity";
@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    score: string;

    @Column({ type: 'date' })
    date: Date;

    @Column()
    player: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.scores)
    quiz: Quiz;
}
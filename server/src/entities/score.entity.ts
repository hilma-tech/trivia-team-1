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
    date: number;

    @ManyToOne(() => User, (user) => user.scores)
    user: User;

    @ManyToOne(() => Quiz, (quiz) => quiz.scores)
    quiz: Quiz;
}
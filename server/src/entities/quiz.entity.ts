import { User } from "./user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Score } from "./score.entity";
import { Question } from "./question.entity";
@Entity()
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ name: "image_url", nullable: true })
    imageUrl: string;

    @ManyToOne(() => User, (user) => user.quizzes)
    creator: User;

    @OneToMany(() => Score, (scores) => scores.quiz, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    scores: Score[]

    @OneToMany(() => Question, (questions) => questions.quiz, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    questions: Question[]

}
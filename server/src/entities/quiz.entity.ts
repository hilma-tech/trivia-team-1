import { User } from "./user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Score } from "./score.entity";
import { Question } from "./question.entity";
@Entity()
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column({ name: "image_url", nullable: true })
    imageUrl: string;

    @ManyToOne(() => User, (user) => user.quizzes, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: "creator_id" })
    creator: User;

    @OneToMany(() => Score, (scores) => scores.quiz, { cascade: true })
    scores: Score[]

    @OneToMany(() => Question, (questions) => questions.quiz, { cascade: true })
    questions: Question[]
}
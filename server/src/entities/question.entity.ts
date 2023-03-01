import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Answer } from "./answer.entity";
import { Quiz } from "./quiz.entity";
@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ name: "image_url", nullable: true })
    imageUrl: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.questions, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: "quiz_id" })
    quiz: Quiz;

    @OneToMany(() => Answer, (answers) => answers.question, { cascade: true })
    answers: Answer[]

}
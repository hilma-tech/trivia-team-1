import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Answer } from "./answer.entity";
import { Quiz } from "./quiz.entity";
@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    imgae_url: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    quiz: Quiz;

    @OneToMany(() => Answer, (answers) => answers.question, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    answers: Answer[]

}
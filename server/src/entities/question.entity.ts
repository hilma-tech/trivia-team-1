import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Answer } from "./answer.entity";
import { Quiz } from "./quiz.entity";
@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ name: "image_url",  nullable: true })
    imageUrl: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.questions, {nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    quiz: Quiz;

    @OneToMany(() => Answer, (answers) => answers.question)
    answers: Answer[]

}
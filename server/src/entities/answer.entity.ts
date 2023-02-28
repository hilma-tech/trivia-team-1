import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Question } from "./question.entity";
@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ nullable: true })
    image_url: string;

    @Column()
    is_correct: boolean;

    @ManyToOne(() =>Question , (question) => question.answers)
    question: Question;
    

}
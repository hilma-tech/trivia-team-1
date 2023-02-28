import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Question } from "./question.entity";
@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ name: "image_url",  nullable: true  })
    imageUrl: string;
    
    @Column({ name: "is_correct" })
    isCorrect: boolean;

    @ManyToOne(() =>Question , (question) => question.answers)
    question: Question;
    

}
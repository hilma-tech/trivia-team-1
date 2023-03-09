import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Question } from "./question.entity";
@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ name: "image_url", nullable: true })
    imageUrl: string;

    @Column({ name: "is_correct" })
    isCorrect: boolean;

    @ManyToOne(() =>Question , (question) => question.answers, {nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', orphanedRowAction: "delete"})
    @JoinColumn({ name: "question_id" })
    question: Question;
}
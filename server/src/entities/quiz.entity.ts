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

    @ManyToOne(() => User, (user) => user.quizzes, {nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    creator: User;

<<<<<<< HEAD
    @OneToMany(() => Score, (scores) => scores.quiz, {onDelete: 'CASCADE'})
    scores: Score[]

    @OneToMany(() => Question, (questions) => questions.quiz, {onDelete: 'CASCADE'})
=======
    @OneToMany(() => Score, (scores) => scores.quiz, {cascade:true})
    scores: Score[]

    @OneToMany(() => Question, (questions) => questions.quiz, {cascade:true})
>>>>>>> 81e447fb7310c1ea8379203fecd458e35fc6b60c
    questions: Question[]

}
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Quiz } from "./quiz.entity";
import { User } from "./user.entity";
@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    score: number;

    @CreateDateColumn()
    date: Date;

    @Column()
    player: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.scores, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // @JoinColumn({ name: "quiz_id" })
    quiz: Quiz;
}
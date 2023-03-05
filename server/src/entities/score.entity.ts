<<<<<<< HEAD
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from "typeorm";
=======
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
>>>>>>> 00d285421b87ad21886f320e070e081f87ed2799
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

<<<<<<< HEAD
    @ManyToOne(() => Quiz, (quiz) => quiz.scores, {nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade:true })
=======
    @ManyToOne(() => Quiz, (quiz) => quiz.scores, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: "quiz_id" })
>>>>>>> 00d285421b87ad21886f320e070e081f87ed2799
    quiz: Quiz;
}
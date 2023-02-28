import { Quiz } from "./quiz.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { Password } from "./password.entity";
import { Score } from "./score.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @OneToMany(() => Quiz, (quizzes) => quizzes.creator, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    quizzes: Quiz[]

    @OneToOne(() => Password, (password) => password.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    password: Password

}
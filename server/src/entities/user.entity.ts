import { Quiz } from "./quiz.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { Password } from "./password.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @OneToMany(() => Quiz, (quizzes) => quizzes.creator)
    quizzes: Quiz[]

    @OneToOne(() => Password, (password) => password.user)
    password: Password

}
import { Quiz } from "./quiz.entity";
import { ChildEntity, OneToMany } from "typeorm";
import { User as AuthUser } from '@hilma/auth-nest';

@ChildEntity()
export class ExtendedUser extends AuthUser {
    @OneToMany(() => Quiz, (quizzes) => quizzes.creator)
    quizzes: Quiz[]
}
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { User } from "./user.entity";
@Entity()
export class Password {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    password: string;
    @OneToOne(() => User, (user) => user.password)
    user: User

}
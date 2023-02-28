import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
@Entity()
export class Password {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @OneToOne(() => User, (user) => user.password)
    @JoinColumn({name: "user_id", referencedColumnName: "id"})
    user: User
}

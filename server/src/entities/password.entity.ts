import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { ExtendedUser } from "./user.entity";
@Entity()
export class Password {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @OneToOne(() => ExtendedUser, (user) => user.password, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: "user_id", referencedColumnName: "id"})
    user: ExtendedUser
}
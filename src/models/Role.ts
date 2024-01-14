import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { User } from "./User";


@Entity("role")
export class Role extends BaseEntity {
    map(arg0: (role: any) => any) {
        throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn()
    id!: number; 

    @Column()
    role_name!: string;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    @OneToMany(() => User, (user) => user.role)
    users!: User[];

}

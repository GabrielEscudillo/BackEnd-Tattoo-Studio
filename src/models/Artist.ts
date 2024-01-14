import { BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, Entity, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";
import { Design } from "./Design";
import { Appointment } from "./Appointment";


@Entity("artist")
export class Artist extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    portfolio!: string;

    @Column()
    user_id!: number;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    @OneToMany(() => User, (user) => user.role)
    users!: User[];

    @OneToMany(() => Design, (design) => design)
    design!: Design[];

    @OneToMany(() => Appointment, (appointment) => appointment.artist)
    customerAppointments!: Appointment[];

    @OneToOne(() => Artist, (artist) => artist.users)
    @JoinColumn ({name: "artist_id"})
    artist?: Artist;
}

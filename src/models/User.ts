import { 
    BaseEntity, 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    JoinColumn, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    OneToMany 
} from "typeorm";
import { Role } from "./Role";
import { Artist } from "./Artist";
import { Appointment } from "./Appointment";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    last_name!: string;

    @Column()
    address!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    phone_number!: number;

    @Column()
    role_id!: number;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn ({name: "role_id"})
    role!: Role;

    @ManyToOne(() => Artist, (artist) => artist.users)
    @JoinColumn ({name: "artist_id"})
    artist!: Artist;

    @OneToMany(() => Appointment, (appointment) => appointment.user_id)
    customerAppointments!: Appointment[];
}

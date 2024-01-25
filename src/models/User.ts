import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    OneToOne
} from "typeorm";
import { Role } from "./Role";
import { Artist } from "./Artist";
import { Appointment } from "./Appointment";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    last_name!: string;

    @Column()
    address!: string;

    @Column()
    email!: string;

    @Column()
    password_hash!: string;

    @Column()
    phone_number!: number;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn ({name: "role_id"})
    role!: Role;

    @OneToOne(() => Artist, (artists) => artists.user)
    artist?: Artist;
    
    @OneToMany(() => Appointment, (appointment) => appointment.user_id)
    customerAppointments!: Appointment[];
}

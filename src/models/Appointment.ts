import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Artist } from "./Artist";

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  artist_id!: number;

  @Column({ type: "date" })
  date!: Date;

  @Column({ type: "time" })
  time!: Date;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.role)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user!: User;

  @ManyToOne(() => Artist, (artist) => artist.user)
  @JoinColumn({ name: "artist_id", referencedColumnName: "id" })
  artist!: Artist;
}

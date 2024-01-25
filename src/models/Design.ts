import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Artist } from "./Artist";


@Entity("designs")
export class Design extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    artist_id!: number;

    @Column()
    style!: string;

    @Column()
    image!: string;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    @ManyToOne(() => Artist, (artist) => artist.user)
    @JoinColumn ({name: "artist_id"})
    artist!: Artist;
}

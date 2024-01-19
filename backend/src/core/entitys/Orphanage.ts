import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import Image from "./Image";

@Entity("orphanages")
export default class Orphanage {
  @PrimaryGeneratedColumn()
  id: number

  @Column("text", { nullable: false })
  name: string

  @Column("decimal", { nullable: false })
  latitude: number

  @Column("decimal", { nullable: false })
  longitude: number

  @Column("text", { nullable: false })
  about: string

  @Column("text", { nullable: false })
  instructions: string

  @Column("text", { nullable: false })
  opening_hours: string

  @Column("boolean", { nullable: false })
  open_on_weekends: boolean

  @OneToMany(() => Image, image => image.orphanage, { cascade: ["insert", "update"] })
  @JoinColumn({ name: "orphanage_id" })
  images: Image[]
}
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Platform } from "./Platform";
import { UploadedFile } from "@models/UploadedFile";


@Entity({name:'partner'})
export class Partner extends BaseEntity{

  constructor(Partner: Partial<Partner>) {
    super();
    Object.assign(this, Partner);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column({default: false, nullable: false, type: 'boolean'})
  hidden: boolean

  @Column({nullable: true, type: 'json'})
  logo?: UploadedFile

  @Column({nullable:true})
  website?: string

  @Column({nullable:true})
  description?: string

  @Column({default:100, nullable:true})
  order: number = 100

  @ManyToOne('platform', 'partner')
  platform: Platform

  @Column()
  platformId: number
}


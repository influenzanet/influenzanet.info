import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import {ResourceWithOptions} from "adminjs/types/src/adminjs-options.interface";
import {Platform} from "./Platform";
// import uploadFeature from '@adminjs/upload'
// const path = require("path");

@Entity({name:'partner'})
export class Partner extends BaseEntity{

  constructor(id: number, name: string, logo: string, website: string, description: string, platform: Platform[]) {
    super();
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.website = website;
    this.description = description;
    this.platform = platform;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  logo: string

  @Column({nullable:true})
  website?: string

  @Column({nullable:true})
  description?: string;

  @ManyToMany(() => Platform)
  @JoinTable()
  platform: Platform[]
}


import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {ResourceWithOptions} from "adminjs/types/src/adminjs-options.interface";
import {Platform} from "./Platform";

@Entity({name:'country'})
export class Country extends BaseEntity{
  constructor(data: Partial<Country>) {
    super()
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToMany(() => Platform, (platform: Platform) => platform.country)
  @OneToMany('platform', 'country')
  platforms: Array<Platform>
}

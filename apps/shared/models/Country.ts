import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Platform } from "./Platform";


@Entity({name:'country'})
export class Country extends BaseEntity{
  constructor(data: Partial<Country>) {
    super()
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  name: string;

  @Column({default: false, nullable: false, type: 'boolean'})
  hidden: boolean

  // @OneToMany(() => Platform, (platform: Platform) => platform.country)
  @OneToMany('platform', 'country')
  platforms: Array<Platform>
}

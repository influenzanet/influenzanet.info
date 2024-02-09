import {BaseEntity, Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name:'tag'})
export class Tag extends BaseEntity{
  constructor(id: number, label: string) {
    super();
    this.id = id;
    this.label = label;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  label: string;

}


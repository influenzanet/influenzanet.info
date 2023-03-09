import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity({name:'publication'})
export class Publication extends BaseEntity{
  constructor(id: number, title: string, authors: string) {
    super();
    this.id = id;
    this.title = title;
    this.authors = authors;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({type:'varchar', length: 200})
  authors: string;

  @Column()
  publisher: string;

  @Column()
  publicationDate: string

  @Column({nullable:true})
  url?: string
}


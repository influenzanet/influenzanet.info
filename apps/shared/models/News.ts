import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  RelationId
} from 'typeorm';
import {Platform} from "@models/Platform";
import {Tag} from "@models/Tag";

@Entity({name:'news'})
export class News extends BaseEntity{
  constructor(id: number, title: string, content: string) {
    super();
    this.id = id;
    this.title = title;
    this.content = content;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({type:'longtext'})
  content: string;


  @Column({default: '(current_date)'})
  publicationDate: string

  @ManyToOne('tag', 'news')
  tag: Tag

  @RelationId((news: News) => news.tag)
  @Column()
  tagId: number;

}


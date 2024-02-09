import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Country } from "./Country";
import { Partner } from "./Partner";
import { PlatformData, platformDataFeature } from "@models/PlatformData";
import { UploadedFile } from "@models/UploadedFile";
import { Type } from "class-transformer";


@Entity({name:'platform'})
export class Platform extends BaseEntity{
  constructor(
    id: number,
    name: string,
    description: string,
    website: string,
    filePrefix: string,
    country: Country,
    countryId: number,
    partners: Partner[],
    data?:PlatformData,
    logo?:UploadedFile & {filename: string}
  ) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.website = website;
    this.filePrefix = filePrefix;
    this.country = country;
    this.countryId = countryId;
    this.partners = partners;
    this.data = data
    this.logo = logo

    this.graphData = this.graphData || new GraphData();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  filePrefix: string

  @Column({default: false, nullable: false, type: 'boolean'})
  hidden: boolean

  @Column({default:100})
  order: number

  @Column({nullable:true})
  about?: string;

  @Column({nullable:true})
  website?: string;

  @Column({nullable:true})
  websiteJoinLink?: string;

  @Column({nullable: true, type: 'json'})
  logo?: UploadedFile

  @ManyToOne('country', 'platforms')
  country: Country

  @RelationId((platform: Platform) => platform.country)
  @Column()
  countryId: number;

  @Type(()=>require('./Partner').Partner)
  @OneToMany('partner','platform')
  partners: Partner[]

  data: PlatformData
  graphData?: GraphData

  get filePath(): string{
    return `/public/upload/${this.logo?.key}`
  }
}

export class GraphDataFeatureIndexed{
  [key: string]: platformDataFeature[]
  constructor(data?: Partial<GraphDataFeatureIndexed>){ Object.assign(this, data) }
}

export class GraphData {
  constructor(data?: Partial<PlatformData>|Partial<GraphData>) {
    data && Object.assign(this, data)
    this.active = this.active || new GraphDataFeatureIndexed()
    this.incidence = this.incidence || new GraphDataFeatureIndexed()
    this.visits_cumulated = this.visits_cumulated || new GraphDataFeatureIndexed()
  }
  active: GraphDataFeatureIndexed
  incidence: GraphDataFeatureIndexed
  visits_cumulated: GraphDataFeatureIndexed
}

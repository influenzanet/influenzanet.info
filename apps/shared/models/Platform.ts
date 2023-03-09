import {BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId, ManyToMany} from 'typeorm';
import {Country} from "./Country";
import {Partner} from "./Partner";
import {
  PlatformData, platformDataResponseFeature, PlatformFeature
} from "@models/PlatformData";


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
    partner: Partner[],
    data?:PlatformData,
    logo?:string
  ) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.website = website;
    this.filePrefix = filePrefix;
    this.country = country;
    this.countryId = countryId;
    this.partner = partner;
    this.data = data
    this.logo = logo

    this.graphData = this.graphData || new GraphData();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable:true})
  description?: string;

  @Column({nullable:true})
  website?: string;

  @Column()
  filePrefix: string

  @Column({default: true})
  active: boolean

  @Column({default:100, nullable:true})
  order: number

  @Column({nullable: true})
  logo?: string

  @ManyToOne('country', 'platforms')
  country: Country

  @RelationId((platform: Platform) => platform.country)
  @Column()
  countryId: number;

  @ManyToMany(() => Partner)
  partner: Partner[]

  data: PlatformData
  graphData?: GraphData
}


export class GraphDataFeature{
  constructor(data?: Partial<GraphDataFeature>) {
    data && Object.assign(this, data)
    this.rows = this.rows || ([] as platformDataResponseFeature[])
  }
  rows: platformDataResponseFeature[]
  hasData?: boolean
}

export class GraphDataFeatureIndexed{[key: string]: GraphDataFeature}

export class GraphData {
  constructor(data?: Partial<PlatformData>) {
    data && Object.assign(this, data)
    this.active = this.active || new GraphDataFeatureIndexed()
    this.incidence = this.incidence || new GraphDataFeatureIndexed()
    this.visits_cumulated = this.visits_cumulated || new GraphDataFeatureIndexed()
  }
  active: GraphDataFeatureIndexed
  incidence: GraphDataFeatureIndexed
  visits_cumulated: GraphDataFeatureIndexed
}

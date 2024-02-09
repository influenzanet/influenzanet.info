import {Platform} from "@models/Platform";
import moment from "moment";

export class PlatformFeature{
  constructor(data: any) {
    if(!!data?.yw){
      this.week = Number(data.yw.toString().slice(-2))
      this.year = Number(data.yw.toString().slice(0, 4))
      this.month = moment().day("Monday").year(this.year).isoWeek(this.week).toDate().getMonth()
      this.isFirstOfMonth = moment().year(this.year).month(this.month).startOf('month').isoWeekday(8).isoWeek() === this.week;
    }
    if(data.dataType) this.dataType = data.dataType
  }
  year: number
  week: number
  month: number
  isFirstOfMonth: boolean
  dataType?: platformDataType
  value?: number
  min?: number
  max?: number
  index?: string

  public static statsToIndex(season?, syndrome?, variable?, dataType?:platformDataType){
    // index format: season|syndrome|variable, null value are set to _
    return `${dataType && dataType === 'visits_cumulated' ? '_' : (season || '_')}|${syndrome || '_'}|${variable || '_'}`
  }

  public static indexToStats(index:string){
    // index format: season|syndrome|variable, null value are set to _
    let indexComponents = index.split('|')
    return{
      season: indexComponents[0] !== '_' ? indexComponents[0]: undefined,
      syndrome: indexComponents[1] !== '_' ? indexComponents[1]: undefined,
      variable: indexComponents[2] !== '_' ? indexComponents[2]: undefined,
    }
  }
}

export class PlatformData {
  constructor(data: Partial<PlatformData>) { Object.assign(this, data)}
  active: PlatformDataActive[]
  incidence: PlatformDataIncidence[]
  visits_cumulated: PlatformDataVisitsCumulated[]
}

export class PlatformDataActive extends PlatformFeature{
  constructor(data: Partial<PlatformDataActive>) {
    super(data);
    Object.assign(this, data)
    this.value = this.value || this.active
  }
  active: number
  method: string
  season: string
  syndrome: string
  yw: string

  // avgKey:string = 'active'
  // maxKey:string = 'upper'
  // minKey:string = 'lower'
}

export class PlatformDataIncidence extends PlatformFeature {
  constructor(data: Partial<PlatformDataIncidence>) {
    super(data);
    Object.assign(this, data)
    this.min = this.lower * 1000
    this.value = this.incidence * 1000
    this.max = this.upper * 1000
  }
  active: string
  count: number
  incidence: number
  lower: number
  method: string
  part: number
  season: number
  syndrome: string
  type: string
  upper: number
  yw: string
  // avgKey:string = 'active'
}

export class PlatformDataVisitsCumulated extends PlatformFeature{
  constructor(data: Partial<PlatformDataVisitsCumulated>) {
    super(data);
    Object.assign(this, data)
    this.min = this.cum_prop_adj_low * 100
    this.value = this.cum_prop_adj * 100
    this.max = this.cum_prop_adj_up * 100
  }
  cum_prop_adj: number
  cum_prop_adj_low: number
  cum_prop_adj_up: number
  cum_prop_raw; number
  n_adj: number
  n_missing: string
  n_total: number
  n_weight: number
  prop_adj: number
  prop_adj_low: number
  prop_adj_up: number
  prop_raw: number
  season: number
  syndrome: string
  total_adj: number
  total_weight: number
  variable: string
  yw: string
}


export type platformDataType = 'active'|'incidence'|'visits_cumulated'

export type platformDataResponse = {
  platform:Platform,
  data:(PlatformDataIncidence|PlatformDataActive|PlatformDataVisitsCumulated)[] | undefined
  dataType:platformDataType
}

export type platformDataFeature = PlatformDataIncidence|PlatformDataActive|PlatformDataVisitsCumulated

import * as moment from "moment";
import {flow, sum, sumBy, values} from "lodash";
import {filter, groupBy, map, orderBy, reduce} from "lodash/fp";
import {
  PlatformDataActive,
  PlatformDataIncidence,
  platformDataResponseFeature,
  PlatformDataVisitsCumulated
} from "@models/PlatformData";



export const platformDataAdapter = (data: platformDataResponseFeature[], dataFilter:PlatformDataFilter)=>{
  let adapted = platformDataAdapter2(data, dataFilter)
  return adapted
}

export const platformDataAdapter2 = (data: platformDataResponseFeature[], dataFilter:PlatformDataFilter)=>{
  let syndrome = dataFilter.syndrome
  let variable = dataFilter.variable
  let endYear = dataFilter.year
  let startYear = endYear - 1
  let startWeek = moment().year(startYear).month(7).startOf('month').isoWeekday(8).isoWeek();
  let endWeek = moment().year(endYear).month(8).endOf('month').startOf('isoWeek').isoWeek()

  let filteredData = flow(
    filter((e:platformDataResponseFeature)=>e.year === startYear && e.week >= startWeek || e.year === endYear && e.week <= endWeek)
  )(data)

  let results = []

  if(!!data && data[0] instanceof PlatformDataVisitsCumulated){
     results = flow(
       filter((e:PlatformDataVisitsCumulated)=>!!e.cum_prop_adj && e.variable == dataFilter.variable && e.syndrome === dataFilter.syndrome),
       groupBy('season'),
       map((e:PlatformDataVisitsCumulated[])=>{
         // console.log('Year', e)
         if(e.length == 0) return undefined
         let first = e[0]
         first.cum_prop_adj_low = sumBy(e,(e:PlatformDataVisitsCumulated)=>e.cum_prop_adj_low) / e.length
         first.cum_prop_adj = sumBy(e,(e:PlatformDataVisitsCumulated)=>e.cum_prop_adj) / e.length
         first.cum_prop_adj_up = sumBy(e,(e:PlatformDataVisitsCumulated)=>e.cum_prop_adj_up) / e.length
         return first
       }),
       filter((e:PlatformDataVisitsCumulated[])=>!!e),
    )(data)

    results = [
      values(map((e:PlatformDataVisitsCumulated)=>e.cum_prop_adj)(results)),
      reduce(
        (acc:any, e:PlatformDataVisitsCumulated)=>{
          if(!!e.cum_prop_adj && e.variable == dataFilter.variable){
            acc.min.push(e.cum_prop_adj_low * 100)
            acc.avg.push((e.cum_prop_adj) * 100)
            acc.max.push(e.cum_prop_adj_up * 100)
          }
          return acc
        }, {min: [], avg:[], max:[]}
        )(results)
      ,
      values(results)
    ]
  }
  else if(!!filteredData &&filteredData[0] instanceof PlatformDataActive) {
     results = flow(
       filter('active'),
       orderBy(['yw'], ['asc'])
     )(filteredData)
    results = [
      values(map((e:PlatformDataActive)=>e.yw)(results)),
      {avg: values(map((e:PlatformDataActive)=>e.active)(results)), min:[], max:[]},
      values(results)
    ]
  }
  else if(!!filteredData && filteredData[0] instanceof PlatformDataIncidence){
     results = flow(
       filter((e:PlatformDataIncidence)=>!!e.incidence && e.syndrome === dataFilter.syndrome),
      orderBy(['yw'], ['asc']),
    )(filteredData)

    results = [
      values(map((e:PlatformDataIncidence)=>e.yw)(results)),
      reduce(
          (acc:any, e:PlatformDataIncidence)=>{
            acc.min.push(e.lower * 1000)
            acc.avg.push(e.incidence * 1000)
            acc.max.push(e.upper * 1000)
            return acc
          }, {min: [], avg:[], max:[]}
        )(results)
      ,
      values(results)
    ]
  }
  return results
}


export type PlatformDataSyndrome = 'covid.ecdc'|'ili.ecdc'
export type PlatformDataVariable = 'visit.emergency'|'visit.hospital'|'visit.no'|'visit.other'|'visit.plan'
export class PlatformDataFilter{
  constructor(year?: number, syndrome?: PlatformDataSyndrome, variable?: PlatformDataVariable) {
    this.year = year;
    this.syndrome = syndrome;
    this.variable = variable;
  }
  year?: number
  syndrome?: PlatformDataSyndrome
  variable: PlatformDataVariable
}

import {GraphDataFeature, Platform} from "@models/Platform";
import {
  PlatformDataActive,
  PlatformDataIncidence,
  platformDataResponseFeature,
  platformDataType,
  PlatformDataVisitsCumulated
} from "@models/PlatformData";
import {parse as csv} from "papaparse";
import {forkJoin, Observable, Subscriber} from "rxjs";
import * as moment from "moment/moment";


export class PlatformDataTransformer{
  public static platformDataStatsKeys: platformDataType[] = ['active', 'incidence', 'visits_cumulated']

  public static transform(platformList: Platform[]){
    let platformWithDataList: Observable<Platform>[] = platformList.map((platform: Platform):Observable<Platform> => {
      return new Observable((subscriber: Subscriber<Platform>): void => {
        this.platformDataStatsKeys.forEach((platformDataType: platformDataType): void => {
          let baseUrl = '/public/data/platform-data/'
          csv(`${baseUrl}${platform.filePrefix}_${platformDataType}.csv`,
            {
              download: true,
              header: true,
              dynamicTyping: true,
              step: ({data}: { data: platformDataResponseFeature }) => {
                try{
                  let index = this.platformDataStatsToIndex(data.season, data.syndrome, data['variable'], platformDataType)
                  if (!platform.graphData[platformDataType][index]) platform.graphData[platformDataType][index] = new GraphDataFeature();

                  let dataPoint = this.instatiatePlatformFeature(data, platformDataType)
                  if(dataPoint?.value?.toString() !== 'NaN'){ platform.graphData[platformDataType][index]?.rows?.push(dataPoint) }
                }
                catch (e:any){
                  console.error(`ERROR platform graph data generation error: ${platform.filePrefix}_${platformDataType}.csv, ERROR MESSAGE:`, e)
                }
              },
              complete: (results: { data: platformDataResponseFeature[] }) => {
                subscriber.next(this.addHasDataToPlatform(platform))
                subscriber.complete()
              },
              error(error: Error) {
                console.warn(`${platform.filePrefix}_${platformDataType}.csv`, error)
                subscriber.next(platform)
                subscriber.complete()
              }
            });
        })
      })
    })
    return forkJoin(platformWithDataList)
  }

  public static addHasDataToPlatform(platform:Platform){
    this.platformDataStatsKeys.forEach((statKey: "active" | "incidence" | "visits_cumulated")=>{
      for(let index in platform.graphData[statKey]){
        let stats = PlatformDataTransformer.platformDataIndexToStats(index)
        if(platform.graphData[statKey])
          platform.graphData[statKey][index].hasData = this.hasPlatformDataFeatureData(platform.graphData[statKey][index].rows, statKey, stats.season)
      }
    })
    return platform
  }

  public static isStartOfSeason(): boolean {
    let seasonStart = moment().year((new Date()).getFullYear()).month(10).startOf('month')
    let now = moment()
    // let isNewSeason = now.isAfter(seasonStart) ? now.year() : now.subtract(1, 'year')
    return now.isAfter(seasonStart)
  }

  public static hasPlatformDataFeatureData(data: platformDataResponseFeature[], dataType:platformDataType, forSeason?:string){
    let isNewSeason = moment().year().toString() === forSeason
    if(!forSeason || !isNewSeason) return data && data.length > (dataType === 'visits_cumulated' ? 2: 10)
    else return data && data.length > 1
  }

  public static platformDataStatsToIndex(season?, syndrome?, variable?, dataType?:platformDataType){
    // index format: season|syndrome|variable, null value are set to _
    return `${dataType && dataType === 'visits_cumulated' ? '_' : season}|${syndrome || '_'}|${variable || '_'}`
  }

  public static platformDataIndexToStats(index:string){
    // index format: season|syndrome|variable, null value are set to _
    let indexComponents = index.split('|')
    return{
      season: indexComponents[0] !== '_' ? indexComponents[0]: undefined,
      syndrome: indexComponents[1] !== '_' ? indexComponents[1]: undefined,
      variable: indexComponents[2] !== '_' ? indexComponents[2]: undefined,
    }
  }

  public static instatiatePlatformFeature(feature: platformDataResponseFeature, dataType?): platformDataResponseFeature{
    let key = dataType || feature.dataType
    feature.dataType = feature.dataType || key
    return key === 'incidence' ? new PlatformDataIncidence(feature as PlatformDataIncidence)
      : key === 'active' ? new PlatformDataActive(feature as PlatformDataActive)
      : new PlatformDataVisitsCumulated(feature as PlatformDataVisitsCumulated)
  }

}

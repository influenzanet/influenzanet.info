import { GraphData, GraphDataFeatureIndexed, Platform } from "@models/Platform";
import { PlatformDataActive, PlatformDataIncidence, platformDataFeature, platformDataType, PlatformDataVisitsCumulated, PlatformFeature } from "@models/PlatformData";
import { parse as csv } from "papaparse";
import { combineLatest, forkJoin, map, Observable, startWith, Subscriber } from "rxjs";
import moment from "moment";
import { flow, mapValues } from "lodash";
import { groupBy as _groupBy, map as _map, filter as _filter, omitBy as _omitBy } from "lodash/fp";

export class PlatformDataTransformer{
  public static transform(platformList: Platform[]){
    let platformWithDataList: Observable<Platform>[] = platformList.map((platform: Platform):Observable<Platform> => {
      let graphData = new GraphData()

      // GraphData object that hold in each porperty an Observables<GraphDataFeatureIndexed> instead of a GraphDataFeatureIndexed
      let graphData$= mapValues(graphData, (_, platformDataType: platformDataType): Observable<any> => {
        return new Observable((subscriber: Subscriber<GraphDataFeatureIndexed>): void => {
          csv(`/assets/data/platform-data/${platform.filePrefix}_${platformDataType}.csv`, {
            download: true,
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: ({data}: {data: platformDataFeature[]}) => {
              let graphDataFeatureIndexed = flow(
                _map((dataPoint:platformDataFeature)=>this.instantiatePlatformFeature(dataPoint, platformDataType)),
                _filter((dataPoint:platformDataFeature)=>dataPoint.index !== '_|_|_'),
                _groupBy<platformDataFeature>('index'),
                _omitBy((dataPointList:platformDataFeature[], index:string)=>!this.hasPlatformDataFeatureData(dataPointList, platformDataType, PlatformFeature.indexToStats(index).season)),
              )(data)
              subscriber.next(new GraphDataFeatureIndexed(graphDataFeatureIndexed))
              subscriber.complete()
            },
            error(error: Error) {
              subscriber.next(new GraphDataFeatureIndexed())
              subscriber.complete()
            }
          });
        });
      })

      return forkJoin(graphData$).pipe(
        startWith(null),
        map((graphData: GraphData):Platform =>{
          platform.graphData = graphData !== null ? new GraphData(graphData): null
          return platform
        })
      )
    })

    return combineLatest(platformWithDataList)
  }

  public static isStartOfSeason(): boolean {
    let seasonStart = moment().year((new Date()).getFullYear()).month(10).startOf('month')
    let now = moment()
    return now.isAfter(seasonStart)
  }

  public static hasPlatformDataFeatureData(data: platformDataFeature[], dataType:platformDataType, forSeason?:string){
    let isNewSeason = moment().year().toString() === forSeason
    if(dataType === 'visits_cumulated' || isNewSeason) return data && data.length > 2
    else return data && data.length >= 10
  }

  public static instantiatePlatformFeature(feature: platformDataFeature, dataType?:platformDataType): platformDataFeature{
    let key = dataType || feature.dataType
    let newFeature = {
      ...feature,
      dataType: key,
      index: PlatformFeature.statsToIndex(feature.season, feature.syndrome, feature['variable'], key)
    }
    return key === 'incidence' ? new PlatformDataIncidence(newFeature as PlatformDataIncidence)
      : key === 'active' ? new PlatformDataActive(newFeature as PlatformDataActive)
      : new PlatformDataVisitsCumulated(newFeature as PlatformDataVisitsCumulated)
  }

}

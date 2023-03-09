import {Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as c3 from 'c3';
import {ChartAPI, DataPoint, DataSeries} from "c3";
import {Subject, ReplaySubject, Observable} from "rxjs";
import {platformDataResponseFeature, platformDataType, PlatformDataVisitsCumulated} from "@models/PlatformData";
import {combineLatest} from "rxjs";
import * as moment from 'moment'
import {PlatformDataFilter, PlatformDataSyndrome, PlatformDataVariable} from "./PlatformData.adapter";
import {PlatformDataTransformer} from "../platform-data.transformer";
import {GraphDataFeature, GraphDataFeatureIndexed} from "@models/Platform";
import {flow} from "lodash";
import {mapValues, toArray, some, entries} from "lodash/fp";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {shareReplay} from "rxjs/operators";

@Component({
  selector: 'platform-data-chart',
  templateUrl: './platform-data-chart.component.html',
  styleUrls: ['./platform-data-chart.component.scss'],
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule]
})
export class PlatformDataChartComponent implements OnInit {
  private data$: ReplaySubject<GraphDataFeatureIndexed>
  private chart$: Subject<ElementRef<HTMLElement>>
  public isPlatformDataUpdated$: ReplaySubject<boolean>
  public chartAPI: ChartAPI


  public platformDataFilter: PlatformDataFilter
  public platformDataFilterAvailable: platformDataFilterAvailable
  public isChartData:boolean
  public isChartDataEmpty:boolean

  @ViewChild('chart', {read: ElementRef, static: false})
  set chart(el: ElementRef<HTMLElement>) {
    this._chart = el
    this.chart$.next(el)
  }
  get chart(){ return this._chart }
  private _chart:ElementRef<HTMLElement>

  @Input() public dataType: platformDataType

  @Input()
  set data(data:GraphDataFeatureIndexed){
    this.generatePlatformDataFilterAvailable(data)
    this._data = data;
    this.data$.next(data)
  }
  get data(){ return this._data }
  private _data: any

  constructor() {
    this.isChartData = undefined
    this.data$ = new ReplaySubject<any>(1)
    this.chart$ = new Subject<ElementRef<HTMLElement>>()
    this.platformDataFilterAvailable = {
      year: [],
      syndrome: [],
      variable: [],
    }
    this.isPlatformDataUpdated$ = new ReplaySubject<boolean>()
  }
  ngOnInit(): void {
    combineLatest([this.chart$, this.data$]).subscribe(([chart, data]: [ElementRef<HTMLElement>, GraphDataFeatureIndexed])=>{
      this.generateChart(chart, data, this.platformDataFilter)
      this.isPlatformDataUpdated$.next(this.checkIsPlatformDataUpdated(data))
    })
  }

  public filterChange(){ this.generateChart(undefined, undefined, this.platformDataFilter) }
  public generateChart(
    chartDiv:ElementRef<HTMLElement>=this.chart,
    data: GraphDataFeatureIndexed=this.data,
    dataFilter: PlatformDataFilter=this.platformDataFilter
  ){

    this.isChartDataEmpty = typeof data === 'object' && data != null && Object.keys(data).length == 0

    let index = PlatformDataTransformer.platformDataStatsToIndex(dataFilter.year, dataFilter.syndrome, dataFilter.variable, this.dataType)
    let chartData = data[index]

    let isChartData = !!chartData && !!chartData.rows
      && PlatformDataTransformer.hasPlatformDataFeatureData(chartData.rows, this.dataType, dataFilter.year.toString())

    if(!isChartData) this.isChartData = false
    else{
      this.isChartData = false
      this.chartAPI && this.chartAPI.unload()
      this.chartAPI = c3.generate({
        bindto: chartDiv.nativeElement,
        data: {
          // @ts-ignore
          json: chartData.rows,
          keys: {
            value: ['max', 'min', 'value']
          },
          types: {max: 'area', min: 'area', value: "line"},
          color(color: string, d: DataSeries | DataPoint){ return  d.id === 'value' ? '#555' : '#bbb'},
        },
        axis: {
          x: {
            type: 'category',
            tick: {
              format: (d:any)=>{
                let dataPoint = chartData.rows[d]
                if(dataPoint instanceof PlatformDataVisitsCumulated){ return `${dataPoint.season}` }
                return dataPoint.week == 1
                  ? ` ${dataPoint.year}`
                  : dataPoint.isFirstOfMonth
                    ? moment().month(dataPoint.month).format('MMM')
                    : undefined
              },
              width : 100
            }
          },
          y: {type: "linear"}
        },
        legend: {
          show: false
        },
        grid:{
          focus:{
            show:false
          }
        },
        onrendered: ()=>{ this.isChartData = true }
      });
    }
  }

  public generatePlatformDataFilterAvailable(data:any){
    let defaultFilters = undefined

    // Find filters for most recent data
    for(let index in data){
      let stats = PlatformDataTransformer.platformDataIndexToStats(index)

      if(PlatformDataTransformer.hasPlatformDataFeatureData(data[index].rows, this.dataType, stats.season)){
        let hasBoth = (x)=>x.syndrome === 'covid.ecdc' && x.variable === 'visit.emergency'
        let hasOne = (x)=>x.syndrome === 'covid.ecdc' || x.variable === 'visit.emergency'

        let active = ()=>this.dataType === 'active' && Number(stats.season || '0') >= defaultFilters.year
        let incidence = ()=>this.dataType === 'incidence' && hasOne(stats) && Number(stats.season || '0') >= defaultFilters.year
        let cumulated = ()=>this.dataType === 'visits_cumulated' && (!hasBoth(defaultFilters) && (hasBoth(stats) || hasOne(stats)))

        // If this is newer than defaulFilters set this stats as defaultfilters
        if(!defaultFilters || cumulated() || incidence() || active()){
          defaultFilters = new PlatformDataFilter(
            Number(stats.season),
            stats.syndrome as PlatformDataSyndrome,
            stats.variable as PlatformDataVariable
          )
        }
      }

      for(let record of data[index].rows){
        record.season && this.platformDataFilterAvailable.year.push(Number(record.season))
        record.syndrome && this.platformDataFilterAvailable.syndrome.push(record.syndrome)
        record.variable && this.platformDataFilterAvailable.variable.push(record.variable)
      }
    }
    this.platformDataFilterAvailable.year = [...new Set(this.platformDataFilterAvailable.year)].sort().reverse()
    this.platformDataFilterAvailable.syndrome = [...new Set(this.platformDataFilterAvailable.syndrome)]
    this.platformDataFilterAvailable.variable = [...new Set(this.platformDataFilterAvailable.variable)]

    this.platformDataFilter = defaultFilters || new PlatformDataFilter()

  }

  public checkIsPlatformDataUpdated(data: GraphDataFeatureIndexed){
    if(this.dataType === 'visits_cumulated'){
      return flow(
        mapValues((feature: GraphDataFeature)=>{
          let isNewSeasonNow = PlatformDataTransformer.isNewSeasonNow()
          return isNewSeasonNow
            ? feature.rows.some((row: platformDataResponseFeature)=>row.season === moment().subtract(1, 'year').year())
            : PlatformDataTransformer.hasPlatformDataFeatureData(feature.rows, this.dataType)
        }),
        toArray,
        some((x)=>!!x)
      )(data)
    }
    else{
      return  flow(
        entries,
        mapValues(([index, feature]: [string, GraphDataFeature])=>{
          let stats = PlatformDataTransformer.platformDataIndexToStats(index)
          let isNewSeasonNow = PlatformDataTransformer.isNewSeasonNow()
          let isNewSeason = moment().year().toString() === stats.season
          return isNewSeasonNow ?
            isNewSeason && PlatformDataTransformer.hasPlatformDataFeatureData(feature.rows, this.dataType, stats.season)
            : PlatformDataTransformer.hasPlatformDataFeatureData(feature.rows, this.dataType, stats.season)
        }),
        toArray,
        some((x)=>!!x)
      )(data)
    }
  }
}

type platformDataFilterAvailable = {
  year: number[],
  syndrome: PlatformDataSyndrome[],
  variable: PlatformDataVariable[],
}

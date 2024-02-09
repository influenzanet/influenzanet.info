import {
  Component,
  computed,
  effect,
  ElementRef, HostListener, input,
  Input, InputSignal,
  Signal,
  signal,
  ViewChild,
  WritableSignal
} from "@angular/core";
import * as c3 from "c3";
import { DataPoint, DataSeries } from "c3";
import { platformDataType, PlatformDataVisitsCumulated, PlatformFeature } from "@models/PlatformData";
import moment from "moment";
import { PlatformDataFilter, PlatformDataSyndrome, PlatformDataVariable } from "./PlatformData.adapter";
import { GraphDataFeatureIndexed } from "@models/Platform";
import { isEmpty } from "lodash";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'platform-data-chart',
  templateUrl: './platform-data-chart.component.html',
  styleUrls: ['./platform-data-chart.component.scss'],
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule]
})
export class PlatformDataChartComponent{
  constructor() {
    // Init filter
    effect(()=>!!this.chart() && !!this.filterAvailable() && this.filterChange(), {allowSignalWrites: true})
    // Generate chart on filter change
    effect(()=> this.currentFilter() && this.hasData() && this.generateChart(), {allowSignalWrites: true})
  }

  // Inputs
  public dataType: InputSignal<platformDataType> = input();
  public data: InputSignal<GraphDataFeatureIndexed> = input();

  // Queries
  @ViewChild('chart', {read: ElementRef}) private set _chart(el: ElementRef<HTMLElement>) {this.chart.set(el.nativeElement)}
  private chart: WritableSignal<HTMLElement> = signal(undefined)

  // Properties
  public hasData: Signal<boolean> = computed(()=>!isEmpty(this.data()))
  public hasRendered: WritableSignal<boolean> = signal(undefined)
  public isLoading: Signal<boolean> = computed(()=>!this.data() && !this.hasRendered())

  public filterAvailable: Signal<platformDataFilterAvailable> = computed(()=>this.hasData() && this.getPlatformDataFilterAvailable(this.data()))
  public currentFilter: WritableSignal<PlatformDataFilter> = signal({} as PlatformDataFilter)

  private chartInstance: WritableSignal<c3.ChartAPI> = signal(undefined)

  // Methods
  private getPlatformDataFilterAvailable(data: GraphDataFeatureIndexed){
    // Get the available filter from the data object keys (format: year|syndrome|variable)
    let filterAvailable = Object.keys(data).reduce((acc:platformDataFilterAvailable, index:string)=>{
      let [season, syndrome, variable] = index.split('|')
      return {
        year: season !== '_' ? [...acc.year, Number(season)] : acc.year,
        syndrome: syndrome !== '_' ? [...acc.syndrome, syndrome as PlatformDataSyndrome] : acc.syndrome,
        variable: variable !== '_' ? [...acc.variable, variable as PlatformDataVariable] : acc.variable,
      }
    }, {year: [], syndrome: [], variable: []})

    // Remove the duplicates and sort the year in descending order
    return {
      year: [...new Set(filterAvailable.year)].sort().reverse(),
      syndrome: [...new Set(filterAvailable.syndrome)],
      variable: [...new Set(filterAvailable.variable)],
    }
  }

  public filterChange(value: Partial<PlatformDataFilter> = {}){
    // Update the current filters with the new value
    // keep the current value if the new value if the new value is undefined
    // set default value if the current value is undefined (default value is the first value of the available filter)
    this.currentFilter.update((filter:PlatformDataFilter)=>{
      return new PlatformDataFilter(
        value.year || filter.year || this.filterAvailable().year[0],
        value.syndrome || filter.syndrome || this.filterAvailable().syndrome[0],
        value.variable || filter.variable || this.filterAvailable().variable[0]
      )
    })
  }

  // Triggered when just before the chart start rendering
  private onBeforeRender(){ this.hasRendered.set(false) }
  // Triggered when the chart has finished rendering
  private onAfterRender(){ this.hasRendered.set(true) }

  public generateChart(
    chart:HTMLElement=this.chart(),
    data: GraphDataFeatureIndexed|null=this.data(),
    dataFilter: PlatformDataFilter=this.currentFilter()
  ){
    // Trigger the onBeforeRender event
    this.onBeforeRender()

    // Get the index corresponding to the actual filter
    // Used to retrieve the data from the graphDataFeatureIndexed
    let index = PlatformFeature.statsToIndex(dataFilter.year, dataFilter.syndrome, dataFilter.variable, this.dataType())
    let chartData = !!data && data[index]

    if(!!chartData && !!chart){
      this.chartInstance.set(c3.generate({
        bindto: chart,
        svg: { classname: 'svg-chart' },
        data: {
          // @ts-ignore
          json: chartData,
          keys: { value: ['max', 'min', 'value'] },
          types: {max: 'area', min: 'area', value: "line"},
          color(color: string, d: DataSeries | DataPoint){ return  d.id === 'value' ? '#555' : '#bbb'},
        },
        resize: {auto: true},
        axis: {
          x: {
            type: 'category',
            tick: {
              format: (d:any)=>{
                let dataPoint = chartData[d]
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
        transition: {
          duration: null
        },
        onrendered: ()=>{
          // Trigger the onAfterRender event
          this.onAfterRender()
        }
      }))
    }
  }
}

type platformDataFilterAvailable = {
  year: number[],
  syndrome: PlatformDataSyndrome[],
  variable: PlatformDataVariable[],
}

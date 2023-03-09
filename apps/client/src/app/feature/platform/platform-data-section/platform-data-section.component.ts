import {Component, Input, ViewChildren, OnInit} from '@angular/core';
import {Platform} from "@models/Platform";
import {SwipeableContainerComponent} from "../../../layout/partials/swipeable-container/swipeable-container.component";
import {CommonModule} from "@angular/common";
import {PlatformDataChartComponent} from "../platform-data-chart/platform-data-chart.component";
import {combineLatest, map, Observable, Subject} from "rxjs";

@Component({
  selector: 'platform-data-section',
  templateUrl: './platform-data-section.component.html',
  styleUrls: ['./platform-data-section.component.scss'],
  standalone: true,
  imports: [CommonModule, SwipeableContainerComponent, PlatformDataChartComponent]
})
export class PlatformDataSectionComponent{
  public isPlatformDataUpdated$: Observable<boolean>

  @Input() platform: Platform

  @ViewChildren(PlatformDataChartComponent)
  set platformDataChartList(chartComponentList:PlatformDataChartComponent[]){
    // Check isPlatformDataUpdated$ on PlatformDataChartComponent child components
    // If more than 2 components are updated isPlatformDataUpdated$ emits true else emits false
    let updatedList$ = chartComponentList.map((x:PlatformDataChartComponent)=>x.isPlatformDataUpdated$)
    this.isPlatformDataUpdated$ = combineLatest(updatedList$).pipe(
      map((updateList:boolean[])=> updateList.filter((x:boolean)=>!!x).length >= 2)
    )
  }
}

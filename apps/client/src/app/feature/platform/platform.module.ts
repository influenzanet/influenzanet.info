import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformDataChartComponent } from './platform-data-chart/platform-data-chart.component';
import { PlatformDataSectionComponent } from './platform-data-section/platform-data-section.component';
import {PlatformCardGridComponent} from "./platform-card-grid/platform-card-grid.component";

@NgModule({
  declarations: [],
  exports: [PlatformDataChartComponent, PlatformCardGridComponent, PlatformDataSectionComponent],
  imports: [
    CommonModule,
    PlatformDataSectionComponent,
    PlatformDataChartComponent,
    PlatformCardGridComponent,
  ],
})
export class PlatformModule {}

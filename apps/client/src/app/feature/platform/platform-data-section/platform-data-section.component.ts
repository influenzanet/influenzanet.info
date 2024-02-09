import { Component, inject, input, InputSignal } from "@angular/core";
import { Platform } from "@models/Platform";
import { SwipeableContainerComponent } from "@app/layout/partials/swipeable-container/swipeable-container.component";
import { CommonModule } from "@angular/common";
import { PlatformDataChartComponent } from "../platform-data-chart/platform-data-chart.component";
import { Router } from "@angular/router";


@Component({
  selector: 'platform-data-section',
  standalone: true,
  imports: [CommonModule, SwipeableContainerComponent, PlatformDataChartComponent],
  styleUrls: ['./platform-data-section.component.scss'],
  template: `
    <div class="platform">
    <!-- Platform Title Section-->
    <p class="platform-title link">
      <span (click)="goToPlatform(platform())">
        <span class="underline">
          <span>Data Source: </span>
          <strong class="underline">{{ platform().name }}</strong>
        </span>
        <span class="arrow mobile-hidden" [hidden]="!platform()">
          <i class="fa-solid fa-arrow-right"></i>
        </span>
      </span>
    </p>

    <!-- Platform Graph Section-->
    <swipeable [arrows]="true" class="data-container">
      <div #slide>
        <p class="platform-data-title"><span><strong>Active Users</strong> (weekly)</span></p>
          @defer(prefetch on idle){
            <platform-data-chart
              [data]="platform().graphData?.active"
              dataType="active"
              #activeUsersChart
            ></platform-data-chart>
            <a
              [class.transparent]="!activeUsersChart?.hasData()"
              [href]="'/public/data/platform-data/'+platform().filePrefix+'_active.csv'"
              target="_blank"
              class="link"
            >Download the data (.csv)</a>
          }
          @placeholder { <div class="chart-placeholder"><i class="fa-solid fa-circle-notch fa-spin text-xl"></i></div> }
      </div>

      <div #slide>
        <p class="platform-data-title"><span><strong>Incidence</strong> (ILI / per 1000)</span></p>
        @defer(prefetch on idle){
          <platform-data-chart
            [data]="platform().graphData?.incidence"
            dataType="incidence"
            #incidenceChart
          ></platform-data-chart>
          <a
            [class.transparent]="!incidenceChart?.hasData()"
            [href]="'/public/data/platform-data/'+platform()?.filePrefix+'_incidence.csv'"
            target="_blank"
            class="link"
          >Download the data (.csv)</a>
        }
        @placeholder { <div class="chart-placeholder"><i class="fa-solid fa-circle-notch fa-spin text-xl"></i></div> }
      </div>

      <div #slide>
        <p class="platform-data-title"><span><strong>Visits Cumulative</strong> (ILI / per 100)</span></p>
        @defer(prefetch on idle){
          <platform-data-chart
            [data]="platform().graphData?.visits_cumulated"
            dataType="visits_cumulated"
            #visitsCumulatedChart
          ></platform-data-chart>
          <a
            [class.transparent]="!visitsCumulatedChart?.hasData()"
            [href]="'/public/data/platform-data/'+platform().filePrefix+'_visits_cumulated.csv'"
            target="_blank"
            class="link"
          >Download the data (.csv)</a>
        }
        @placeholder { <div class="chart-placeholder"><i class="fa-solid fa-circle-notch fa-spin text-xl"></i></div> }
      </div>
    </swipeable>
  </div>
  `
})
export class PlatformDataSectionComponent{
  // Dependency Injection
  private router: Router = inject(Router)

  // Inputs
  public platform: InputSignal<Platform> = input();

  // Methods
  public goToPlatform(platform: Platform){
    this.router.navigate(['/team'], {fragment: platform.country.name})
  }
}

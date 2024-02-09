import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {QuarterGridComponent} from "@app/layout/partials/quarter-grid/quarter-grid.component";


@Component({
  selector: "home-howdoesitwork",
  standalone: true,
  imports: [CommonModule,  QuarterGridComponent],
  template: `
    <quarter-grid>
      <div title>How does it work</div>
      <div description>
        <div class="hdiw-item">
          <h3 class="title-container">
            <span class="counter"><span>1.</span></span>
            <span class="title">Report your health status</span></h3>
          <p>If you're living in one of the European countries where the platform is implemented,
            start participating and let us know every week how you're feeling.</p>
        </div>
        <div class="hdiw-item">
          <h3 class="title-container">
            <span class="counter"><span>2.</span></span>
            <span class="title">Check out our results</span></h3>
          <p><a href="/explore-data">Navigate the latest trends</a> for flu and COVID-19 calculated through the data provided by our volunteers.</p>
        </div>
        <div class="hdiw-item">
          <h3 class="title-container">
            <span class="counter"><span>3.</span></span>
            <span class="title">ECDC and WHO Europe have adopted the data</span></h3>
          <p><a href="https://flunewseurope.org/PrimaryCareData/ILI">European and Global health agencies</a> adopt the data collected by the InfluenzaNet platforms and help disseminate where flu and COVID-19 might impact the most.</p>
        </div>
      </div>
    </quarter-grid>
  `,
  styles: [// Language="scss"
    `
      @import "theme-variables";
      @import "global";

      :host{
        .hdiw-item{
          @extend .mb-2;
        }
        .title-container {
          @extend .color-main;
          @extend .ubuntu;
          @extend .font-l;
          @extend .mb-1;
          font-weight: bold;

          text-transform: lowercase;
          display: flex;
          align-items: center;
        }
        .counter{
          @extend .bg-base-accent;
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1 / 1;
          width: 3rem;
          border-radius: 50%;
        }
        .title{
          @extend .ml-1;
          @extend .font-l;
          display: block;
          &::first-letter { text-transform: uppercase; }
        }

        & ::ng-deep .description{
          margin-top:-0.4rem!important;

          @media (max-width: $mobile-break) {
            margin-top:0.5rem!important;
          }
        }
      }
    `
  ],
})
export class HomeHowDoesItWorkComponent {}

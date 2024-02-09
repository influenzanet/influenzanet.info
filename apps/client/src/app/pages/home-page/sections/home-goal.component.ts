import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CounterWithDescriptionComponent } from "@app/feature/ui/counter-with-description/counter-with-description.component";
import { QuarterGridComponent } from "@app/layout/partials/quarter-grid/quarter-grid.component";

@Component({
  selector: "home-goal",
  standalone: true,
  imports: [CommonModule, CounterWithDescriptionComponent, QuarterGridComponent],
  template: `
    <quarter-grid>
      <div title>The goal</div>
      <div description>
        Our health and wellbeing can be threatened by pervasive diseases such as influenza and COVID-19.
        InfluenzaNet is a <strong>crowdsourcing network</strong> of <a href="/projects">national platforms</a> that allows
        <strong>European volunteers</strong> in <strong>12 countries</strong> to help us track these diseases by
        self-reporting their health status <a href="/about-data">every week</a>.
      </div>
      <div content>
        <div class="quarter-container">
          <p>In a nutshell:</p>
          <br>
          <div class="counter-container">
            <div class="fake-card">
              <counter-with-description title="2009" description="Starting year"></counter-with-description>
              <counter-with-description title="45.000+" description="Datasets"></counter-with-description>
              <counter-with-description title="12" description="Active countries"></counter-with-description>
            </div>
          </div>
        </div>
      </div>
    </quarter-grid>
  `,
  styles: // Language=SCSS
  `
    @import "theme-variables";
    @import "global";

    :host{
      .quarter-container{
        display: flex;
        flex-direction: column;
      }
      .counter-container{
        display: flex;
        justify-content: center;
      }

      .fake-card{
        @extend .tb-1;
        @extend .lr-1;
        background: white;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-around;
        border-radius: 5px;
        width: 100%;
        box-shadow: 15px 20px 60px #00000021;

        @media all and (max-width: $mobile-menu-break) {
          flex-direction: column;
          align-items: center;
          width: max-content;
        }
      }

      counter-with-description{ margin: 0 2rem; }
    }
  `
})
export class HomeGoalComponent {}

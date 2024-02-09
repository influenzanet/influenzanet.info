import { ChangeDetectionStrategy, Component, inject, Signal } from "@angular/core";
import { Country } from "@models/Country";
import { PlatformDataProvider } from "@app/feature/platform/platform-data.provider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {
  PlatformDataSectionComponent
} from "@app/feature/platform/platform-data-section/platform-data-section.component";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  PlatformCountryListComponent
} from "@app/feature/platform/platform-country-list/platform-country-list.component";
import { ExpandableComponent } from "@app/feature/ui/expandable";


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'influenza-net-explore-data-page',
  standalone: true,
  imports: [CommonModule, PlatformDataSectionComponent, MatProgressBarModule, PlatformCountryListComponent, ExpandableComponent],
  styles: // Language=SCSS
  `
    @import "theme-variables";
    @import "global";

    ::ng-deep .swiper-wrapper{
      display:inline-flex;
    }
    platform-data-section{ @extend .t-1; }
  `,
  template: `
    <section class="about-section">
     <div class="mobile-hidden"><ng-container [ngTemplateOutlet]="aboutSectionIntro"></ng-container></div>
     <div class="desktop-hidden">
          <expandable>
              <div title>How to read the data</div>
              <div content><ng-container [ngTemplateOutlet]="aboutSectionIntro"></ng-container></div>
          </expandable>
     </div>
     <ng-template #aboutSectionIntro>
         <p>In the page "explore the data", the number of active participants, the number of ILI and COVID-19 onsets and
             the calculated incidence as well as the number of people who seeked healthcare are listed for each week.
         </p>
         <p>The incidence for Influenza-like Illness (ILI) can be downloaded as CSV files (importable into Excel).</p>
     </ng-template>
    </section>

    <plaform-country-list [countryList]="countryList()">
      <ng-template let-country>
        @for(platform of country.platforms; track platform.id){
          <platform-data-section [platform]="platform"></platform-data-section>
        }
      </ng-template>
    </plaform-country-list>
`
})
export class ExploreDataPageComponent {
  private platformDataProvider: PlatformDataProvider = inject(PlatformDataProvider)
  public countryList: Signal<Country[]|undefined> = toSignal(this.platformDataProvider.countryListActive$)
}

import { AfterViewChecked, Component, inject, OnInit, ViewChild } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { PlatformSummaryComponent } from "@app/feature/platform/platform-summary/platform-summary.component";
import { PlatformCountryListComponent } from "@app/feature/platform/platform-country-list/platform-country-list.component";
import { PlatformDataProvider } from "@app/feature/platform/platform-data.provider";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";


@Component({
  selector: "influenza-net-team-page",
  standalone: true,
  imports: [PlatformSummaryComponent, PlatformCountryListComponent],
  template: `
    <plaform-country-list [countryList]="countryList()">
        <ng-template let-country>
            @for(platform of country.platforms; track platform.id; let first = $first, last = $last){
                <platform-summary [platform]="platform" [class.middle-platform]="!first"></platform-summary>
            }
        </ng-template>
    </plaform-country-list>
  `,
  styles: // Language="scss
  `
    @import "theme-variables";
    @import "global";
    .middle-platform { @extend .t-2; }
  `
})
export class TeamPageComponent{
  private platformDataProvider: PlatformDataProvider = inject(PlatformDataProvider)
  public countryList = toSignal(this.platformDataProvider.countryListActive$)
}

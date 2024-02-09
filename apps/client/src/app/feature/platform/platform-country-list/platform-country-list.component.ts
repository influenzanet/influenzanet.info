import {
  Component,
  computed,
  ContentChild,
  effect,
  inject,
  input,
  InputSignal,
  signal,
  Signal,
  TemplateRef,
  WritableSignal
} from "@angular/core";
import { Country } from "@models/Country";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'plaform-country-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  styleUrls: ['./platform-country-list.component.scss'],
  template: `
    @if(isLoading()) {
      <div class="loader-container">
          <span>Loading Data</span>
          <mat-progress-bar [color]="'accent'" mode="indeterminate"></mat-progress-bar>
      </div>
    }
    @else {
      <!-- Country names. On click  scrolls to the top of the corresponding coutry section -->
      <section >
        <p class="country-section-title">{{ title() }}</p>
        <div class="country-links">
          @for(country of countryList(); track country.id){
            <a class="link country-link" (click)="scrollTo(country.name)">{{country.name}}</a>
          }
        </div>
      </section>
    }
    <!-- Country sections -->
    <section>
      @for(country of countryList(); track country.id){
        <div class="country" [id]="country?.name" #country>
          <div class="subtitle">{{ country?.name }}</div>
          <div class="space-x">
              <ng-container *ngTemplateOutlet="template(); context: {$implicit: country}"></ng-container>
          </div>
        </div>
      }
    </section>
`
})
export class PlatformCountryListComponent{
  constructor() {
    // Scroll to country section on route change
    effect(()=>{ !!this.scrollToID() && this.scrollTo(this.scrollToID()) })
  }

  // Dependency injection
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  private router: Router = inject(Router)

  // Inputs
  public countryList: InputSignal<Country[]> = input();
  public title: InputSignal<string> = input('Countries participating in InfluenzaNet');

  // Queries
  @ContentChild(TemplateRef) set _template(template: TemplateRef<any>){ this.template.set(template) }
  public template: WritableSignal<TemplateRef<any>> = signal(undefined)

  // Properties
  private scrollToID: Signal<string> = toSignal(this.activatedRoute.fragment)
  public isLoading: Signal<boolean> = computed(()=> this.countryList() === undefined || !this.countryList()?.length)

  // Methods
  // Scroll to specific platform section
  public scrollTo(elementId: string){
    this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        replaceUrl: false,
        fragment: elementId,
      }
    );
  }
}

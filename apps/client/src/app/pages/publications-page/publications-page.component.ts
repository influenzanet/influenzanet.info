import { Component, computed, inject, signal, Signal, WritableSignal } from "@angular/core";
import { PublicationDataProvider } from "@app/feature/publication/publication-data.provider";
import { Publication } from "@models/Publication";
import {
  at as _at,
  keyBy as _keyBy,
  map as _map,
  mapKeys as _mapKeys,
  orderBy as _orderBy,
  sortedUniq as _sortedUniq,
  values as _values
} from "lodash/fp";
import { flow } from "lodash";
import { CommonModule } from "@angular/common";
import {
  PublicationPreviewComponent
} from "@app/feature/publication/publication-preview/publication-preview.component";
import { PageTitleComponent } from "@app/layout/partials/page-title/page-title.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { SeparatorWithCaret } from "@app/feature/ui/separator-with-caret";
import { CounterWithDescriptionComponent } from "@app/feature/ui/filter-section";
import { TemplateDirective } from "@app/feature/ui/utils/TemplateDirective";
import { toSignal } from "@angular/core/rxjs-interop";
import { FilterComponent } from "@app/feature/ui/filter/filter.component";


@Component({
  selector: 'influenza-net-publications-page',
  standalone: true,
  imports: [
    CommonModule, PublicationPreviewComponent, PageTitleComponent, MatExpansionModule, SeparatorWithCaret, CounterWithDescriptionComponent, TemplateDirective, FilterComponent
  ],
  template : `
    <page-title [title]="'Publications'">
      <a class="desktop-hidden link" (click)="filterSection.toggle()">Filters</a>
    </page-title>
    <section class="content">
      <filter-section #filterSection>
        <filter *template [name]="'year'" [values]="availableYears()" (onChange)="applyFilter($event)"></filter>
      </filter-section>

      <section class="description">
        @for(publication of publicationListFiltered(); track publication?.id) {
          <publication-preview [publication]="publication"></publication-preview>
        }
        @empty {
          <h2 class="no-results">No publications found</h2>
        }
      </section>
    </section>
  `,
  styleUrls: ['./publications-page.component.scss'],
})
export class PublicationsPageComponent{
  /* Dependency injection */
  private publicationDataProvider: PublicationDataProvider = inject(PublicationDataProvider)

  /* Properties */
  public publicationList: Signal<Publication[]> = toSignal(this.publicationDataProvider.publicationList$, {initialValue: []})

  // Publication list filtered by selected years
  public publicationListFiltered: Signal<Publication[]> = computed(()=>
    flow(
      _keyBy('publicationDate'),
      _mapKeys((date:string)=>this.getYear(date)),
      _at(this.filteredYears()),
      _values,
    )(this.publicationList())
  )

  // All years available in the publication list
  public availableYears: Signal<number[]> = computed(()=>
    flow(
      _orderBy(['publicationDate'], ['desc']),
      _map((p:Publication)=>this.getYear(p.publicationDate)),
      _sortedUniq,
    )(this.publicationList())
  )

  // Selected years
  public filteredYears: WritableSignal<number[]> = signal([])

  /* Methods */
  // convenience method to calculate the year from a date string
  private getYear(date: string): number { return new Date(date).getFullYear() }

  // Change the selected years
  public applyFilter(years: number[]) { this.filteredYears.set(years) }
}

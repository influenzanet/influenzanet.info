import { Component, OnInit } from "@angular/core";
import { orderBy } from "lodash/fp";
import { map, Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { News } from "@models/News";
import { NewsDataProvider } from "@app/feature/news/news-data.provider";
import { NewsListComponent } from "@app/feature/news/news-list/news-list.component";
import { PageTitleComponent } from "@app/layout/partials/page-title/page-title.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { SeparatorWithCaret } from "@app/feature/ui/separator-with-caret";
import { CounterWithDescriptionComponent } from "@app/feature/ui/filter-section";
import { TemplateDirective } from "@app/feature/ui/utils/TemplateDirective";
import { FilterComponent } from "@app/feature/ui/filter/filter.component";


@Component({
  selector: 'influenza-net-news-page',
  standalone: true,
  imports: [
    CommonModule, NewsListComponent, PageTitleComponent,
    MatExpansionModule, SeparatorWithCaret, CounterWithDescriptionComponent, TemplateDirective, FilterComponent],
  template : `
    <page-title [title]="'News'">
      <a class="desktop-hidden link" (click)="filterSection.toggle()">Filters</a>
    </page-title>

    <section class="content">
      <filter-section #filterSection>
        <filter *template [name]="'years'" [values]="allYears" (onChange)="applyFilter($event)"></filter>
        <filter *template [name]="'tags'" [values]="allTags" (onChange)="applyNewsFilter($event)"></filter>
      </filter-section>

      <section class="description">
         <news-list [newsList]="newsList$ | async"></news-list>
      </section>
    </section>
  `,
  styleUrls: [`./news-page.component.scss`],
})
export class NewsPageComponent implements OnInit {
  constructor(private newsDataProvider: NewsDataProvider) {}

  public newsList$: Observable<News[]>

  private filteredYears: number[] = []
  private filteredTags: string[] = []

  public isFilterExpanded: boolean;

  protected allYears: number[];
  protected allTags: string[];

  ngOnInit(): void {
    // Order by news date, most recent on top
    this.isFilterExpanded = false
    this.newsList$ = this.newsDataProvider.newsList$.pipe(
      map((newsList: News[]) => <News[]>orderBy('publicationDate', 'desc')(newsList))
    )
    this.populateFilters()
  }

  populateFilters() {
    this.newsList$.subscribe((newsList: News[]) => {
      this.allYears = Array.from(new Set(newsList.map(news => this.getYear(news.publicationDate)))).sort((a, b) => b - a)
      this.allTags = Array.from(new Set(newsList.filter(news=>news.tag).map(news => news.tag.label)))
      console.log(this.allTags)
      this.filteredYears = this.allYears
      this.filteredTags = this.allTags
    })
  }

  filterExpanded() {this.isFilterExpanded = !this.isFilterExpanded;}

  getYear(date: string): number { return new Date(date).getFullYear() }
  filterByYear(news: News): boolean { return this.filteredYears.includes(this.getYear(news.publicationDate)) }
  filterByTag(news: News): boolean { return news.tag && this.filteredTags.includes(news.tag.label) }

  applyFilter(years: number[]) {
    this.filteredYears = years

    this.newsList$ = this.newsDataProvider.newsList$.pipe(
      map((newsList: News[]) => {
        return newsList.filter((news: News) => this.filterByYear(news) && this.filterByTag(news))
      })
    )
  }

  applyNewsFilter(tags: string[]) {
    this.filteredTags = tags
    this.newsList$ = this.newsDataProvider.newsList$.pipe(
      map((newsList: News[]) => {
        return newsList.filter((news: News) => this.filterByYear(news) && this.filterByTag(news))
      })
    )
  }
}

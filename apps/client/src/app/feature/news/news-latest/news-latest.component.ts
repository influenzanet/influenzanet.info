import { Component, inject, Input, OnInit, Signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {News} from "@models/News";
import {NewsPreviewComponent} from "@app/feature/news/news-preview/news-preview.component";
import {NewsDataProvider} from "@app/feature/news/news-data.provider";
import {map, Observable} from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "news-latest",
  standalone: true,
  imports: [CommonModule, NewsPreviewComponent],
  template: `
      @for (news of latestNews(); track news.id) {
        <news-preview class="news-preview" [news]="news"></news-preview>
      }
      @empty {
        <h3>
          There are no news yet
        </h3>
      }
  `,
  styles: // Language=SCSS
  `
    @import "theme-variables";
    @import "global";

    :host{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      grid-gap: 2rem;

      @media all and (min-width: 1600px) {
        grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
      }
      @media all and (min-width: 1980px) {
        grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
      }
    }
  `
})
export class NewsLatestComponent{
  private newsDataProvider: NewsDataProvider = inject(NewsDataProvider)
  public latestNews: Signal<News[]> = toSignal(
    this.newsDataProvider.newsList$.pipe(
      map((newsList: News[]) => newsList.sort((a, b) => b.publicationDate.localeCompare(a.publicationDate))),
      map((sortedNews: News[]) => sortedNews.slice(0, 3))
  ))
}

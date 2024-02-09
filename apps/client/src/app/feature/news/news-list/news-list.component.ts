import { Component, HostListener, input, Input, InputSignal, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {News} from "@models/News";
import {NewsDataProvider} from "@app/feature/news/news-data.provider";
import {map, Observable} from "rxjs";
import {orderBy} from "lodash/fp";
import {NewsPreviewComponent} from "@app/feature/news/news-preview/news-preview.component";

@Component({
  selector: "news-list",
  standalone: true,
  imports: [CommonModule, NewsPreviewComponent],
  template: `
    <div class="news-list">
      @for(news of newsList(); track news.id){
        <news-preview class="news-preview" [news]="news"></news-preview>
      }
      @empty {
        <h1 class="news-list__empty">
          There are no news yet
        </h1>
      }
    </div>
  `,
  styles: // Language=SCSS
  `
    @import "theme-variables";
    @import "global";

    .news-list {
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
    .news-list__empty{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      grid-column: 1 / -1;
    }

  `
})
export class NewsListComponent {
  public newsList : InputSignal<News[]> = input()
}

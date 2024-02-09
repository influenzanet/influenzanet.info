import { Component, input, InputSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { News } from "@models/News";
import { RouterLink } from "@angular/router";


@Component({
  selector: "news-preview",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if(news()){
      <div class="single-news">
        <div class="single-news-container">
          <div class="news-content">
            <span class="news-tag">{{news().tag?.label }}</span>
            <span class="news-title">{{ news().title }}</span>
            <span class="news-date">{{ news().publicationDate | date:'dd/MM/yyyy'}}</span>
          </div>
          <div class="arrow-circle" [routerLink]="'/news/' + news().id">&rarr;</div>
        </div>
      </div>
    }
  `,
  styles: // Language=SCSS
  `
    @import "theme-variables";
    @import "global";

    .single-news {
      width: 100%;
      max-width: 100%;
      aspect-ratio: 1 / 1;

      &:hover{
        .arrow-circle {
          cursor: pointer;
          background-color: $color-accent;
          color: White;
        }
      }

      .single-news-container {
        @extend .bg-base-accent;
        @extend .tb-2;
        @extend .lr-2;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: relative;

        .news-content{
          display: flex;
          flex-direction: column;

          .news-title {
            @extend .ubuntu;
            @extend .font-xl;
            @extend .t-2;
            @extend .b-1;
            &:is(span){
              @extend .font-lh-s;
            }
            font-weight: 500;
          }

          .news-tag{
            @extend .font-s;
            @extend .color-accent;
            @extend .ubuntu;
          }

          .news-date {
            @extend .font-s;
            @extend .ubuntu;
            color:$color-base-accent-dark;
          }
        }

        .arrow-circle {
          aspect-ratio: 1 / 1;
          position: absolute;
          bottom: 15px;
          right: 15px;
          width: 20%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border: solid 1px;
          border-color: $color-accent;
          color: $color-accent;
          font-size: 30px;
        }
      }
    }
  `
})
export class NewsPreviewComponent {
  public news: InputSignal<News> = input();
}

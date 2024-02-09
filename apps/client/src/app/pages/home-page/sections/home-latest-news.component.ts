import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {NewsLatestComponent} from "@app/feature/news/news-latest/news-latest.component";
import { SectionTitleComponent } from "@app/feature/ui/section-title";

@Component({
  selector: "home-latest-news",
  standalone: true,
  imports: [CommonModule, NewsLatestComponent, SectionTitleComponent],
  template: `
    <section-title title="Latest news" superTitle="Updates" />
    <div class="description"><news-latest></news-latest></div>
  `,
  styles: [// Language=SCSS
  `
    @import "theme-variables";
    @import "global";

    :host{
      .title{
        @extend .title;
        @extend .mb-3;
      }
      .super-title{
        @extend .font-s;
        @extend .color-accent;
      }
    }
  `
  ]
})
export class HomeLatestNewsComponent {}

import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'quarter-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quarter-grid-container">
      <div class="title"><ng-content select="[title]"></ng-content></div>
      <div class="description"><ng-content select="[description]"></ng-content></div>
      <div class="content"><ng-content select="[content]"></ng-content></div>
    </div>
  `,
  styles: // Language="scss
    `
    @import "theme-variables";
    @import "global";

    :host{ min-width: 100%; }
    .quarter-grid-container{

      display: grid;
      grid-template-columns: 1fr 5fr;

      &::ng-deep > * > * > * { width: 100%; }

      @media all and (max-width: $mobile-menu-break) {
        display: flex;
        flex-direction: column;
      }

      .title{
        @extend .subtitle;
        @extend .r-3;

        @media all and (max-width: $mobile-menu-break) {
          margin-bottom: 2rem;
          padding-right: 0;
        }
      }

      .description{
        @extend .b-1;
        margin-top: 0.5rem;
      }

      .content{
        grid-column-start: 2;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 2;
      }

    }
  `,
})
export class QuarterGridComponent{}

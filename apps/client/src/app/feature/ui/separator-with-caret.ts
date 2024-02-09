import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "seaprator-with-caret",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="separator-with-caret">
      <div class="separator"></div>
      <div class="caret-container">
        <div class="caret"></div>
      </div>
      <div class="separator"></div>
    </div>
  `,
  styles: [`
    @import "theme-variables";
    @import "global";

    :host{
      width: 100%;
    }

    .separator-with-caret{
      $separator-color: $color-base-accent;
      $separator-bg-color: $color-base-light;
      $separator-size: 0.7rem;
      $separator-width: 2px;

      @extend .t-2;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
      color: $separator-color;


      .caret-container{
        width: calc(calc($separator-size * 2) - 4px);
      }

      .caret {
        position: relative;
        top: calc($separator-size * -1);
      }

      .caret:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        border-bottom: solid darken($separator-color , 4%);
        border-left: solid rgba(0, 0, 0, 0);
        border-right: solid rgba(0, 0, 0, 0);
        border-bottom-width: $separator-size;
        border-left-width: $separator-size;
        border-right-width: $separator-size;
      }

      .caret:after {
        content: '';
        position: absolute;
        left: $separator-width;
        top: $separator-width;
        border-bottom: solid $separator-bg-color;
        border-left: solid rgba(0, 0, 0, 0);
        border-right: solid rgba(0, 0, 0, 0);
        border-bottom-width: calc($separator-size - $separator-width);
        border-left-width: calc($separator-size - $separator-width);
        border-right-width: calc($separator-size - $separator-width);
      }

      .separator{
        flex: 1;
        border-bottom: $separator-width solid $separator-color;
      }
    }
  `],
})
export class SeparatorWithCaret {}

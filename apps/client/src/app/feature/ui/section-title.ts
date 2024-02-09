import { Component, input, Input, InputSignal } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "section-title",
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(superTitle()){ <div class="super-title">{{ superTitle() }}</div> }
    @if(title()){
        <div class="title">
            <span>{{ title() }}</span>
            <ng-content></ng-content>
        </div>
    }
  `,
  styles: // Language=SCSS
    `
    @import "theme-variables";
    @import "global";

    :host{
      .title{
        @extend .title;
        @extend .mb-3;
        @extend .font-xxxl;
        padding: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .super-title{
        @extend .font-m;
        @extend .color-accent;
      }
    }
  `
})
export class SectionTitleComponent {
  // Inputs
  public title: InputSignal<string> = input();
  public superTitle: InputSignal<string> = input();
}

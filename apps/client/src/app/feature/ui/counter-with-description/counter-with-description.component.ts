import { Component, input, InputSignal } from "@angular/core";
import { CommonModule } from "@angular/common";


@Component({
  selector: "counter-with-description",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="counter-container">
      <div class="counter-title">{{ title() }}</div>
      <div class="counter-description">{{ description() }}</div>
    </div>
  `,
  styles: [`
    @import "theme-variables";
    @import "global";

    .counter-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom:0.7rem;
    }
    .counter-title{
      @extend .color-accent;
      @extend .ubuntu;
      @extend .font-4xl;
    }

    .counter-description{
      @extend .font-m;
      font-weight: 400;
    }

  `],
})
export class CounterWithDescriptionComponent {
  public title: InputSignal<string> = input()
  public description: InputSignal<string> = input()
}

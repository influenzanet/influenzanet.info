import { Component, input, Input, InputSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Publication } from "@models/Publication";


@Component({
  selector: "publication-preview",
  standalone: true,
  imports: [CommonModule],
  template: `
    @if(publication()){
      <div class="single-publication">
        <div class="icon"><i class="fa-regular fa-file"></i></div>
        <div class="content">
          <h3 class="publication-title">{{ publication().title }}</h3>
          <p class="publication-authors">{{ publication().authors }}</p>
          <p class="publication-publisher">{{ publication().publisher }}</p>
          @if(publication().url){
            <a class="publication-url link"
               [href]="publication().url"
               target="_blank">{{ publication().url }}
            </a>
          }
        </div>
      </div>
    }
  `,
  styles: // Language=SCSS
  `
    @import "theme-variables";
    @import "global";

    .single-publication{
      @extend .tb-1;
      display: grid;
      grid-template-columns: 3rem 5fr;
      word-wrap: break-word;
      word-break: break-word;

      .icon{
        @extend .subtitle;
        @extend .r-3;
        @extend .font-xl;
        @extend .color-accent;
      }

      .content{
        @extend .b-1;
        margin-top: 0.5rem;

        & > * {
          @extend .font-m;
        }
        .publication-title{
          @extend .color-main;
          font-weight: bold;
        }
      }
    }
  `
})
export class PublicationPreviewComponent {
  public publication: InputSignal<Publication> = input();
}

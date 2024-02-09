import { Component, ElementRef, inject, signal, Signal, ViewChild, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EntityCardComponent } from "@app/feature/ui/entity-card.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { PartnerDataProvider } from "@app/feature/partner/partner-data.provider";
import { SwipeableContainerComponent } from "@app/layout/partials/swipeable-container/swipeable-container.component";
import { SectionTitleComponent } from "@app/feature/ui/section-title";


@Component({
  selector: 'home-partner-carousel',
  standalone: true,
  imports: [CommonModule, EntityCardComponent, SwipeableContainerComponent, SectionTitleComponent],
  template: `

    <section-title title="All project's partners" superTitle="The team">
      <div class="arrow-container mobile-hidden">
          <span class="arrow mr-0" [class.disabled]="isFirstStep()" (click)="!isFirstStep() && previous()"><</span>
          <span class="arrow" [class.disabled]="isLastStep()" (click)="!isLastStep() && next()">></span>
      </div>
    </section-title>

    <swipeable [dots]="true" class="container">
      @for (item of data(); track i; let i=$index) {
        <entity-card class="slide" [entity]="item" #slide/>
      }
    </swipeable>
  `,
  styles: // Language=SCSS
    `
      @import "global";
      .partner-section-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      swipeable{
        width: calc(100% + 2rem);
        & ::ng-deep {
          .slide {
            width: calc(100% / 4);
            max-width: calc(100% / 4);
            min-width: calc(100% / 4);

            @media all and (max-width: 1600px) {
              width: calc(100% / 3);
              max-width: calc(100% / 3);
              min-width: calc(100% / 3);
            }
            @media all and (max-width: 1400px) {
              width: calc(100% / 2);
              max-width: calc(100% / 2);
              min-width: calc(100% / 2);
            }
          }
          .item-logo{
            background-color: #fff!important;
          }
        }

        @media all and (max-width: $mobile-break){
          padding-bottom: 3rem;
        }
      }
      .arrow-container{
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .arrow{
        @extend .font-xl;
        @extend .color-accent;
        cursor: pointer;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;

        border:solid 1px $color-accent;

        &.disabled{
          border-color:  darken($color-base-accent, 10%);
          color: darken($color-base-accent, 10%);
        }
      }
    `
  ,
})
export class HomePartnerCarouselComponent {
  private partnerDataProvider: PartnerDataProvider = inject(PartnerDataProvider)
  public data: Signal<any[]> = toSignal(this.partnerDataProvider.partnerList$)

  @ViewChild(SwipeableContainerComponent) set _swipable(swipeableContainer: SwipeableContainerComponent){ this.swipable.set(swipeableContainer) }
  public swipable: WritableSignal<SwipeableContainerComponent> = signal(undefined)

  // Properties from the swipeable component
  public isFirstStep(){ return this.swipable()?.isFirstStep() }
  public isLastStep(){ return this.swipable()?.isLastStep() }

  // Methods from the swipeable component
  public next(){this.swipable()?.next() }
  public previous(){ this.swipable()?.previous() }
}

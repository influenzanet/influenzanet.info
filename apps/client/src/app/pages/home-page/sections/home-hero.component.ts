import { Component, computed, HostListener, inject, signal, Signal, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SwipeableContainerComponent } from "@app/layout/partials/swipeable-container/swipeable-container.component";
import { RouterLink } from "@angular/router";
import { MainNavigationService } from "@app/layout/main-navigation/main-navigation.service";
import { toSignal } from "@angular/core/rxjs-interop";


@Component({
  selector: "home-hero",
  standalone: true,
  imports: [CommonModule, SwipeableContainerComponent, RouterLink],
  template: `
    <swipeable [dots]="true" [style.height.px]="height()">
      <div class="left" #slide>
        <div class="hero-content">
          <div class="intro-text"><h3>Influenzanet is</h3></div>
          <div class="claim-text"><h1>a <strong>Europe-wide community of volunteers</strong> for tracking flu and COVID-19</h1></div>
          <div class="hero-action"><span routerLink="/project" class="hero-action button-accent">View the project</span></div>
        </div>
      </div>
      <div class="right" #slide>
        <div class="hero-content" >
          <div class="intro-text"><h3>Influenzanet is</h3></div>
          <div class="claim-text"><h1>syndromic <strong>surveillance Web platforms</strong> collecting real time data</h1></div>
          <div class="hero-action">
            <span routerLink="/explore-data" class="button-accent">Explore the data</span>
          </div>
        </div>
      </div>
    </swipeable>
  `,
  styles: // Language=SCSS
  `
    @import "theme-variables";
    @import "global";

    :host{
      $hero-padding: 4rem;

      display: flex;
      flex-direction: row;
      align-items: stretch;

      swipeable{
        & ::ng-deep .swipeable-container{
          margin-left: 0!important;
          min-width: 100%!important;
        }
      }

      .left, .right{
        height: 100%;
        flex: 1 1 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .left{
        background-image: url('/assets/img/background/background_dark.png');
        background-size: cover;
        background-position: center;
        .claim-text{color: white;}
        .hero-content{
          @extend .space-x;
          @media all and (min-width: $mobile-menu-break) { padding-right: $hero-padding; }
        }
      }

      .right{
        background-color: $color-base-accent;
        background-image: url('/assets/img/background/bg_light.png');
        background-size: cover;
        background-position: center;
        .claim-text{color: $color-main;}
        .hero-content{
          @extend .space-x;
          @media all and (min-width: $mobile-menu-break) { padding-left: $hero-padding; }
        }
      }

      .hero-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        width: 100%;
        height: 100%;

        padding-top: $hero-padding;
        padding-bottom: $hero-padding;

        @media all and (max-width: $mobile-menu-break) {
          max-width: 600px;
          padding-left: 0!important;
          padding-right: 0!important;
        }

        .intro-text{
          justify-content: flex-end;
          &, & > *{
            @extend .font-m;
            color: $color-accent;
            text-transform: uppercase;
            width: 100%;
            margin-bottom: 1rem;
          }
        }

        .claim-text{
          justify-content: flex-start;
          &, & > *{
            @extend .font-xxxl;
            width: 100%;
          }
        }
        .hero-action{
          padding-top:1rem;
          justify-content: flex-start;
        }

        & > * {
          flex: 1 1 0;
          display: flex;
          flex-direction: column;

          @media all and (max-width: $mobile-menu-break) {
            &:not(.hero-action){width: 100%;}
            padding-left: 0!important;
            padding-right: 0!important;
          }
        }
      }
    }
  `
})
export class HomeHeroComponent {
  public mainNavigationService: MainNavigationService = inject(MainNavigationService)

  @HostListener('window:resize', ['$event']) onResize() { this.windowHeight.set(window.innerHeight) }
  private windowHeight: WritableSignal<number> = signal(window.innerHeight)
  private headerHeight: Signal<number> = toSignal(this.mainNavigationService.height$)

  public height: Signal<number> = computed(() => this.windowHeight() - this.headerHeight())
}

import { Component, computed, inject, input, Input, InputSignal, signal, Signal, WritableSignal } from "@angular/core";
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { debounceTime, filter, map, Observable, tap } from "rxjs";
import { NgIf } from "@angular/common";
import { Title } from "@angular/platform-browser";
import { toSignal } from "@angular/core/rxjs-interop";


@Component({
  standalone: true,
  selector: 'page-title',
  imports: [NgIf],
  template: `
  <section class="page-title-section">
    @if($title()){
      <h1>{{ $title() }}</h1>
    }
    <ng-content></ng-content>
  </section>
  `,
  styles: [// language=SCSS
  `
    @import 'theme-variables';
    @import 'global';
    :host{
      flex: 1 1 auto;
      .page-title-section{
        @extend .space-x;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1 1 auto;

        & > h1{
          @extend .tb-4;
          @extend .font-xxl;
          @extend .roboto;
          @extend .color-main;
          @extend .letter-spacing-m;
          font-weight: bold!important;
          display: flex;
          justify-content: space-between;

          @media (max-width: $mobile-break){ padding-bottom: 2rem; padding-top:2rem; }

          &:first-letter{
            text-transform: uppercase;
          }
        }
      }


    }
  `]
})
export class PageTitleComponent{
  // Dependency Injection
  private router: Router = inject(Router)
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)

  // Inputs
  public title: InputSignal<string> = input()

  // Properties
  public titleFromRouter: Signal<string>
  public $title: Signal<string> = computed(()=>this.title() || this.titleFromRouter())

  constructor() {
    const title$:Observable<string> = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map(() =>this.activatedRoute.firstChild?.snapshot.data['showPageTitle'] !==false && this.activatedRoute.firstChild?.snapshot.data['title']),
    )
    this.titleFromRouter = toSignal(title$)
  }
}

import { inject, Injectable } from "@angular/core";
import { debounceTime, filter } from "rxjs";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ViewportScroller } from "@angular/common";
import { MainNavigationService } from "@app/layout/main-navigation/main-navigation.service";
import { Title } from "@angular/platform-browser";


@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  private router: Router = inject(Router)
  private viewportScroller: ViewportScroller = inject(ViewportScroller)
  private mainNavigationService: MainNavigationService = inject(MainNavigationService)
  private titleService: Title = inject(Title)

  constructor() {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      debounceTime(100),
    ).subscribe((event: NavigationEnd) => {
      this.pageTitle()
      this.scrollPositionRestoration()

      this.mainNavigationService.height$.subscribe((height: number) => {
        this.viewportScroller.setOffset([0, height])
      })
    })
  }

  private pageTitle(){ this.titleService.setTitle(this.activatedRoute.firstChild?.snapshot.data['title']) }
  private scrollPositionRestoration(){
    this.activatedRoute.snapshot.fragment
      ? this.viewportScroller.scrollToAnchor(this.activatedRoute.snapshot.fragment)
      : this.viewportScroller.scrollToPosition([0, 0]);
  }

  public scrollTop(){
    this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        replaceUrl: false,
        fragment: undefined
      }
    ).then(() => this.viewportScroller.scrollToPosition([0, 0]))
  }
}

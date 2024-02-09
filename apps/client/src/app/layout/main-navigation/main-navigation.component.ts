import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { Event, NavigationStart, Router, RouterEvent, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { filter } from "rxjs";
import { MainNavigationService } from "@app/layout/main-navigation/main-navigation.service";


@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class MainNavigationComponent implements OnInit{

  constructor(private router: Router, private mainNavigationService: MainNavigationService) {
    this.isSticky = false
    this.checkSticky()
  }
  ngOnInit(): void {
    // MOBILE ONLY: Subscribe to router events and close menu overlay on route change
    this.router.events
      .pipe(filter((event:Event|RouterEvent)=>event instanceof NavigationStart))
      .subscribe((event: NavigationStart)=>{ this.close() })
  }


  @ViewChild('mainNavigation') set _mainNavigation(mainNavigation: ElementRef) {
    if (mainNavigation) {
      this.mainNavigation = mainNavigation.nativeElement
      this.emitMainNavigationHeight()
    }
  }

  // Subscribe to Page Events
  @HostListener('window:scroll') onScroll() { this.checkSticky() }
  @HostListener('window:resize') onResize() { this.emitMainNavigationHeight() }

  public isSticky: boolean
  public isOpen: boolean
  private mainNavigation: HTMLElement

  public emitMainNavigationHeight() {
    this.mainNavigation && this.mainNavigationService.emitMainNavigationHeight(this.mainNavigation.offsetHeight)
  }
  // Make top navigation sticky
  // Changes behaviour and appearance of to top navigation
  public checkSticky(){ this.isSticky = window.scrollY > 10 }
  public toggleOpen(){ this.isOpen = !this.isOpen }
  public close(){ this.isOpen = false }
}

import {Component, HostListener, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterEvent, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {filter} from "rxjs";


@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class MainNavigationComponent implements OnInit {
  public isSticky: boolean
  public isOpen: boolean

  // Subscribe to Page scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(event:any) { this.checkSticky() }

  constructor(
    private router: Router
  ) {
    this.isSticky = false
    this.checkSticky()
  }
  ngOnInit(): void {
    // MOBILE ONLY: Subscribe to router events and close menu overlay on route change
    this.router.events
      .pipe(filter((event: RouterEvent)=>event instanceof NavigationStart))
      .subscribe((event: NavigationStart)=>{ this.close() })
  }

  // Make top navigation sticky
  // Changes behaviour and appearance of to top navigation
  public checkSticky(){ this.isSticky = window.scrollY > 10 }

  public toggleOpen(){ this.isOpen = !this.isOpen }
  public close(){ this.isOpen = false }

}

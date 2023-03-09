import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";

@Component({
  standalone: true,
  selector: 'back-to-top',
  styleUrls: ['./back-to-top.component.scss'],
  imports: [BrowserModule],
  template: `
    <div class="back-to-top-button" *ngIf="isVisible"  (click)="toTop()">
      <span class="material-symbols-rounded">arrow_upward</span>
    </div>
  `,
})
export class BackToTopComponent{
  public isVisible: boolean
  public isBottom: boolean

  // Subscribe to Page scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(event:any) {
    this.checkVisible()
  }

  constructor(private elementRef: ElementRef) {
    this.isVisible = false
    this.isBottom = false
    this.initBottomOverflow()
    this.checkVisible()
  }

  // Make the component visible only when use has scrolled at least half of the viewport size
  public checkVisible(){
    this.isVisible = window.scrollY > window.innerHeight/2
    this.isVisible && this.initBottomOverflow()
  }

  // Make the component overflow the footer when scroll is at the end pf the page
  public initBottomOverflow(){
    const parent = this.elementRef.nativeElement.parentElement
    const self = this.elementRef.nativeElement
    const lastChild = parent.children && parent.children.length > 1 && parent.children[parent.children.length - 2]

    const margin = 16;
    const unit = 'px'
    const extraSpace = (self.offsetHeight/2) + (margin/2)

    parent.style.marginBottom = `-${extraSpace}${unit}`
    if(lastChild) lastChild.style.marginBottom = `-${extraSpace}${unit}`
  }

  // Scroll page to the top
  public toTop(){
    setTimeout(()=>{
      window.scrollTo({
        left:0,
        top:0,
        behavior: "smooth",
      })
    })
  }
}

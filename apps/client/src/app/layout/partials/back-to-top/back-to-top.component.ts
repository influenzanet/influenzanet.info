import { Component, ElementRef, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoutingService } from "@app/app-routing.service";


@Component({
  standalone: true,
  selector: 'back-to-top',
  styleUrls: ['./back-to-top.component.scss'],
  imports: [CommonModule],
  template: `
    <div class="back-to-top-button" *ngIf="isVisible" (click)="toTop()">
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

  constructor(private elementRef: ElementRef, private routingService: RoutingService) {
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
    const self = this.elementRef.nativeElement

    if(self.previousElementSibling.tagName !== 'ROUTER-OUTLET'){
      const parent = this.elementRef.nativeElement.parentElement

      const unit = 'px'
      const style= getComputedStyle(self);
      const margin = parseInt(style.paddingBottom)
      const extraSpace = (self.offsetHeight/2) + (margin/2)

      parent.style.marginBottom = `-${extraSpace}${unit}`
      self.previousElementSibling.style.marginBottom = `-${extraSpace}${unit}`
    }
  }

  // Scroll page to the top
  public toTop(){ this.routingService.scrollTop() }
}

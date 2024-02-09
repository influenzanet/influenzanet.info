import {
  Component,
  computed,
  ContentChildren,
  ElementRef,
  HostListener, input,
  Input, InputSignal,
  Signal,
  signal,
  ViewChild,
  WritableSignal
} from "@angular/core";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'swipeable',
  styleUrls: ['swipeable-container.component.scss'],
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (arrows()) {
      @if (!isFirstStep()) {
        <span class="arrow left" (click)="previous()" [class.mobile-hidden]="dots()"><i class="far fa-arrow-alt-circle-left"></i></span>
      }
      @if (!isLastStep()) {
        <span class="arrow right" (click)="next()" [class.mobile-hidden]="dots()"><i class="far fa-arrow-alt-circle-right"></i></span>
      }
    }

    <div class="swipeable-frame">
      <div class="swipeable-container" (scroll)="onScroll()" #swipableContainer>
        <ng-content></ng-content>
      </div>
    </div>

    @if(dots()){
      <div class="dots desktop-hidden">
        @for (child of slides(); track child.id; let i=$index) {
          <div
            class="dot"
            [class.active]="(i + 1) === currentStep()"
            (click)="scrollToStep(i + 1)"
          ></div>
        }
      </div>
    }
  `
})
export class SwipeableContainerComponent{
  public arrows: InputSignal<boolean> = input()
  public dots: InputSignal<boolean> = input()

  // windowWidth is used as a trigger(dependency) to recalculate the slideSize and slidePerPage on window resize
  @HostListener('window:resize', ['$event']) onResize(event) { this.windowWidth.set(event.target.innerWidth) }
  public windowWidth: WritableSignal<HTMLElement> = signal(undefined)

  // Dom element reference relative to the swipeable container
  @ViewChild('swipableContainer', {read: ElementRef}) set _swipable(swipeableContainer: ElementRef<HTMLElement>){
    this.swipable.set(swipeableContainer.nativeElement)
  }
  public swipable: WritableSignal<HTMLElement> = signal(undefined)

  // Dom element reference relative to the swipeable items(slides)
  @ContentChildren('slide', {read: ElementRef}) set _children(sildes: ElementRef<HTMLElement>[]){
    this.slides.set(sildes.map(item=>item.nativeElement))
  }
  public slides: WritableSignal<HTMLElement[]> = signal([])

  // Updates the scroll position
  public onScroll(){ this.scrollPosition.set(this.swipable()?.scrollLeft) }
  public scrollPosition : WritableSignal<number> = signal(0)

  // Width in px of the visible area
  // dependency: windowWidth
  public frameWidth: Signal<number> = computed(()=> {
    this.windowWidth() // dependency
    return this.swipable()?.getBoundingClientRect().width
  })

  // Width in px of the single slide, assuming that all slides have the same width, value is equal to the width of the first slide
  // dependency: windowWidth
  public slideSize: Signal<number> = computed(()=> {
    this.windowWidth() // dependency
    return this.slides()[0]?.getBoundingClientRect().width
  })

  // Number slides that fits in the visible area
  public slidePerPage: Signal<number> = computed(()=> this.frameWidth() / this.slideSize() )

  // Determine if the component should behave like a carousel or not based on the number of slides visible on the screen
  // if the number of slides is less or equal than the number of slides visible on the screen the component should not behave like a carousel
  public isStatic: Signal<boolean> = computed(()=> this.slidePerPage() >= this.slides()?.length )

  // Compute the current step based on the scroll position
  public currentStep: Signal<number> = computed(()=> Math.round(this.scrollPosition() / this.slideSize()+1) )
  public isFirstStep: Signal<boolean> = computed(()=> this.currentStep() < 2 )
  public isLastStep: Signal<boolean> = computed(()=> this.currentStep() >= (this.slides()?.length - Math.round(this.slidePerPage()) + 1) )

  public previous(){ this.scrollToStep(this.currentStep() - 1) }
  public next(){ this.scrollToStep(this.currentStep() + 1) }
  public scrollToStep(step:number){ this.swipable()?.scrollTo((step - 1) * this.slideSize(), 0) }
}

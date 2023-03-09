import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, merge, sample} from "rxjs";
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import * as Hammer from 'hammerjs'

// export class HammerConfig extends HammerGestureConfig {
//   override overrides = <any> {
//     'pinch': { enable: false },
//     'swipe': { enable: true, direction: Hammer.DIRECTION_HORIZONTAL, threshold:100 },
//     'pan': { enable: true, direction: Hammer.DIRECTION_HORIZONTAL, threshold:100 }
//   }
// }

@Component({
  selector: 'swipeable',
  template: `
    <span
      class="arrow left desktop-hidden"
      [ngClass]="{disabled: this.isAtStep && this.currentStep === 0}"
      (click)="previous($event)"
    ><i class="fa-solid fa-arrow-left"></i>
    </span>
    <div
      class="swipeable-container"
      #swipeableContainer
      (panleft)="next($event) "
      (panright)="previous($event)"
    >
      <div class="swipeable-inner" #swipeableInner>
        <ng-content></ng-content>
      </div>
    </div>

    <span
      class="arrow right desktop-hidden"
      [ngClass]="{disabled: this.isAtStep && this.children?.length && this.children.length-1 === this.currentStep}"
      (click)="next($event)"
    ><i class="fa-solid fa-arrow-right"></i></span>
  `,
  styleUrls: ['swipeable-container.component.scss'],
  standalone: true,
  imports: [BrowserModule, BrowserAnimationsModule, HammerModule],
  // providers: [
  //   {
  //     provide: HAMMER_GESTURE_CONFIG,
  //     useClass: HammerConfig
  //   }
  // ]
})
export class SwipeableContainerComponent implements OnInit {

  public currentStep: number
  public isAtStep: boolean

  public swipeableContainer: ElementRef<HTMLElement>
  public swipeableInner: HTMLElement
  public inner: HTMLElement
  public children: HTMLCollection

  constructor(private elementRef: ElementRef) {
    this.currentStep = 0;
  }

  @ViewChild('swipeableContainer')
  set _swipable(swipeableContainer: ElementRef<HTMLElement>){
    this.swipeableContainer = swipeableContainer
    swipeableContainer.nativeElement.addEventListener('scroll', ()=>{ this.getSteps() })

    // GET template parts
    this.swipeableInner = swipeableContainer.nativeElement.querySelector('.swipeable-inner')
    this.children = this.swipeableInner.children

    // Expand swipableInner n times
    if(this.swipeableInner && this.children) this.swipeableInner.classList.add(`element-${this.children.length}`)

    // Calculate current position
    this.getSteps()

    // Init snap
    this.addSnap()
  }

  public previous(event?:Event){
    let steps = this.getSteps()
    this.swipeableContainer.nativeElement.scrollTo({
      left: steps.previous * window.innerWidth,
      behavior: 'smooth'
    })
  }

  public next(event?:Event){
    let steps = this.getSteps()
    this.swipeableContainer.nativeElement.scrollTo({
      left: steps.next * window.innerWidth,
      behavior: 'smooth'
    })
  }

  private getSteps(): swipabeSteps{
    let scrollPosition = this.swipeableContainer.nativeElement.scrollLeft
    let stepSize = window.innerWidth
    let current = Math.floor(scrollPosition/stepSize)
    let isAtStep = scrollPosition % stepSize === 0

    let next = current + 1
    let previous = isAtStep ? current - 1: current

    this.currentStep = current
    this.isAtStep = isAtStep

    return {previous, current, next}
  }

  private addSnap(){

    // let hammer = new Hammer(this.swipableContainer.nativeElement);

    // let hammer = new Manager(this.swipeableContainer.nativeElement, {domEvents: true});
    // hammer.add( new Hammer.Pan({direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0}) );
    //
    // hammer.on('panend' , (e)=>{
    //   // do something cool
    //   console.log('hammer swipe')
    //   console.log(e)
    //   e.deltaX > 0 ? this.previous() : this.next()
    //
    // });

    return;

    let start;
    let scroll$ = fromEvent(this.swipeableContainer.nativeElement, 'scroll').pipe(
      // switchMap(value => of(value).pipe(delay(50)))
    )

    // scroll$.subscribe(()=>{console.log('scroll')})

    // MERGE mobile and desktop events
    let swipeStart$ = merge(
      fromEvent(this.swipeableContainer.nativeElement, 'mousedown'),
      fromEvent(this.swipeableContainer.nativeElement, 'touchstart')
    )

    // MERGE mobile and desktop events
    let swipeEnd$ = merge(
      fromEvent(this.swipeableContainer.nativeElement, 'mouseup'),
      fromEvent(this.swipeableContainer.nativeElement, 'touchend')
    ).pipe(sample(scroll$))


    swipeStart$.subscribe(()=>{
      console.log('start')
      start = this.swipeableContainer.nativeElement.scrollLeft
    })
    swipeEnd$.subscribe(()=>{
      console.log('end')
      if(!this.isAtStep){
        let end = this.swipeableContainer.nativeElement.scrollLeft
        let diff = start - end

        if(Math.abs(diff) > 5){
          diff < 0
            ? this.next()
            : this.previous()

          let scrollPrevent = (event)=>{
            // let steps = this.getSteps()
            // this.swipableContainer.nativeElement.scrollTo({
            //   left: steps.current * window.innerWidth,
            //   behavior: 'smooth'
            // })
            event.stopPropagation();
            event.preventDefault();
            event.returnValue = false;
            return false;
          }

          this.swipeableContainer.nativeElement.addEventListener('scroll', scrollPrevent)
          setTimeout(()=>{
            removeEventListener('scroll', scrollPrevent, false)
          },500)
        }

      }
    })

    // let onSwipeStart = ()=>{start = this.swipableContainer.nativeElement.scrollLeft}
    // let onSwipeEnd = ()=>{
    //   if(!this.isAtStep){
    //     let end = this.swipableContainer.nativeElement.scrollLeft
    //     let diff = start - end
    //
    //     if(Math.abs(diff) > 5)
    //       diff < 0
    //       ? this.next()
    //       : this.previous()
    //   }
    // }
    //
    // this.swipableContainer.nativeElement.addEventListener('scroll', ()=>console.log('scroll'))
    //
    //
    // this.swipableContainer.nativeElement.addEventListener('mousedown', onSwipeStart)
    // this.swipableContainer.nativeElement.addEventListener('touchstart', onSwipeStart)
    //
    // this.swipableContainer.nativeElement.addEventListener('mouseup', onSwipeEnd)
    // this.swipableContainer.nativeElement.addEventListener('touchend', onSwipeEnd)
  }


  ngOnInit(): void {  }
}


export type swipabeSteps = {
  previous: number
  current: number
  next: number,
}

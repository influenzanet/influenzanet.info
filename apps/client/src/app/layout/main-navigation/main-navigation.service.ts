import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, Observable, Subject } from "rxjs";


@Injectable({providedIn: 'root'})
export class MainNavigationService{
  constructor() {
    this._height$ = new BehaviorSubject<number>(0)
    this.height$ = this._height$.pipe(distinctUntilChanged())
  }
  private _height$: BehaviorSubject<number>
  public height$: Observable<number>
  public currentHeight: number
  public emitMainNavigationHeight(height:number) {
    this.currentHeight = height
    this._height$.next(height)
  }
}

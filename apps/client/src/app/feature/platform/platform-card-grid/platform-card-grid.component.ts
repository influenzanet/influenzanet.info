import {Component, Input, OnInit} from '@angular/core';
import {PlatformDataProvider} from "../platform-data.provider";
import {Platform} from "@models/Platform";
import {Country} from "@models/Country";
import {combineLatest, switchMap, startWith, of, Observable, BehaviorSubject} from "rxjs";
import {CommonModule} from "@angular/common";


export class GridItem{
  name: string
  descriptionShort?: string
  country: Partial<Country>
  logo?: string
  website?: string
}

@Component({
  selector: 'platform-card-grid',
  templateUrl: './platform-card-grid.component.html',
  styleUrls: ['./platform-card-grid.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PlatformCardGridComponent implements OnInit {
  public dataOverride$: BehaviorSubject<GridItem[]>
  public dataList$: Observable<GridItem[]>

  @Input()
  set data(data: GridItem[]){ this.dataOverride$.next(data) }

  constructor(public platformDataProvider: PlatformDataProvider) {
    this.dataOverride$ = new BehaviorSubject<GridItem[]>(undefined)
  }

  ngOnInit(): void {
    // Get "List of Platform" data from server
    // if "List of Platform" data is provided from parent component use that data instead
    this.dataList$ = combineLatest([
      this.dataOverride$,
      this.platformDataProvider.platformList$.pipe(startWith(undefined)),
    ])
    .pipe(
      switchMap(
        ([dataOverride, platform]: [GridItem[], Platform[]])=> !!dataOverride ? of(dataOverride) : of(platform)
      )
    )

  }
}

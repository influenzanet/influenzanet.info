import {Component, ElementRef, OnInit,} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'quarter-grid',
  template: `
    <div class="quarter-grid-container">
      <div class="title"><ng-content select="[title]"></ng-content></div>
      <div class="description"><ng-content select="[description]"></ng-content></div>
      <div class="content"><ng-content select="[content]"></ng-content></div>
    </div>
  `,
  styleUrls: ['quarter-grid.component.scss'],
  standalone: true,
  imports: [BrowserModule],
})
export class QuarterGridComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {  }
}

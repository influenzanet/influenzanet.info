import { Component, ContentChildren, Input, QueryList } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { SeparatorWithCaret } from "@app/feature/ui/separator-with-caret";
import { TemplateDirective } from "@app/feature/ui/utils/TemplateDirective";


@Component({
  selector: "filter-section",
  standalone: true,
  imports: [CommonModule, MatExpansionModule, SeparatorWithCaret],
  template: `
    <div class="filter-container">
      <div class="mobile-hidden">
        <ng-container *ngFor="let filter of filters">
          <ng-container [ngTemplateOutlet]="filter.template"></ng-container>
        </ng-container>
      </div>

      <div class="desktop-hidden">
        <mat-expansion-panel hideToggle [(expanded)]="isFilterExpanded">
          <ng-container *ngFor="let filter of filters; let i = index">
            <ng-container [ngTemplateOutlet]="filter.template"></ng-container>
            <div class="b-1" *ngIf="i < filters.length-1"></div>
          </ng-container>
          <seaprator-with-caret></seaprator-with-caret>
        </mat-expansion-panel>
      </div>
    </div>
  `,
  styles: [ // Language=SCSS
    `
      @import "theme-variables";
      @import "global";
      .filter-container{
        @extend .mr-2;
        @media all and (max-width: $mobile-menu-break) {
          margin-right: 0;
        }
      }

      .filter{
        @extend .r-5;
        @media all and (max-width: $mobile-menu-break) {
          padding-right: 0;
        }
      }

      .mat-expansion-panel {
        box-shadow: none!important;
        border-radius: 0;
        border-bottom-right-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        @extend .color-base;
        background-color: rgba(0, 0, 0, 0);

        ::ng-deep .mat-expansion-panel-body{
          padding:0;
          @extend .mb-2;
        }
      }

  `],
})
export class CounterWithDescriptionComponent {
  @ContentChildren(TemplateDirective) public filters: QueryList<TemplateDirective>;
  @Input() set expanded(expanded: boolean) {this.isFilterExpanded = expanded}
  isFilterExpanded: boolean = false
  public toggle(): void {this.isFilterExpanded = !this.isFilterExpanded}
}

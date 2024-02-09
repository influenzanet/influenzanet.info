import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";


@Component({
  selector: "expandable",
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  template: `
<!--      <mat-accordion>-->
          <mat-expansion-panel hideToggle #panel>
              <mat-expansion-panel-header>
                  <mat-panel-title>
                      <span class="panel-toggle">
                        <span *ngIf="!panel.expanded"><i class="fa-solid fa-plus"></i></span>
                        <span *ngIf="panel.expanded"><i class="fa-solid fa-minus"></i></span>
                      </span>
                      <ng-content select="[title]"></ng-content>
                  </mat-panel-title>
              </mat-expansion-panel-header>
              <div class="mat-panel-content">
                  <ng-content select="[content]"></ng-content>
              </div>
          </mat-expansion-panel>
<!--      </mat-accordion>-->
  `,
  styles: // Language=SCSS
  `
    @import "theme-variables";
    @import "global";

    .mat-expansion-panel{
      box-shadow: none!important;
      border-bottom: solid 1px $color-base-accent-medium;
      border-radius: 0;
      border-bottom-right-radius: 0!important;
      border-bottom-left-radius: 0!important;
      @extend .color-base;
      background-color: rgba(0,0,0,0)!important;


      mat-expansion-panel-header{
        padding-left: 0;
        padding-right: 0;
        @extend .t-2;
        @extend .b-2;
        background-color: rgba(0,0,0,0)!important;

        mat-panel-title{
          @extend .font-m;
          @extend .color-base;
          font-weight: 500;
          display:flex;
          flex-direction: row;
          align-items: center;

          .panel-toggle{
            @extend .color-accent;
            @extend .font-xl;
            @extend .r-1;
          }
          .panel-title{
            @extend .l-0;
          }
        }
      }

      .mat-panel-content{
        @extend .font-m;
        @extend .t-2;
        @extend .b-0;
      }

    }
  `,
})
export class ExpandableComponent {}


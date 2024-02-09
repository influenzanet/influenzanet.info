import { Component, input, InputSignal } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { QuarterGridComponent } from "@app/layout/partials/quarter-grid/quarter-grid.component";
import { MatTabsModule } from "@angular/material/tabs";
import { Platform } from "@models/Platform";
import { EntityCardComponent } from "@app/feature/ui/entity-card.component";
import { ExpandableComponent } from "@app/feature/ui/expandable";


@Component({
  selector: "platform-summary",
  standalone: true,
  imports: [CommonModule, QuarterGridComponent, MatTabsModule, EntityCardComponent, NgOptimizedImage, ExpandableComponent],
  template: `
      <quarter-grid>
          <div title><img style="min-width: 15vw;" [src]="'/assets/upload/'+platform()?.logo.key" alt="logo" /></div>
          <div description>
              <p class="platform-name capitalize"><strong>{{ platform()?.name }}</strong></p>

              <!-- Desktop layout with tabs -->
              <mat-tab-group [mat-stretch-tabs]="false" mat-align-tabs="start" color="accent" class="mobile-hidden">
                  <mat-tab label="Description">
                      <ng-container *ngTemplateOutlet="descriptionTemplate; context: {$implicit: platform}"></ng-container>
                  </mat-tab>
                  <mat-tab label="Project Partners" [disabled]="platform()?.partners?.length < 1">
                      <ng-container *ngTemplateOutlet="partnerTemplate; context: {$implicit: platform}"></ng-container>
                  </mat-tab>
                  @if(platform()?.about){
                      <mat-tab label="About Data" [disabled]="!platform()?.about">
                          <ng-container *ngTemplateOutlet="aboutTemplate; context: {$implicit: platform}"></ng-container>
                      </mat-tab>
                  }

              </mat-tab-group>

              <!-- Mobile layout with expandables -->
              <div class="desktop-hidden">
                  <expandable>
                      <div title>Description</div>
                      <div content><ng-container *ngTemplateOutlet="descriptionTemplate; context: {$implicit: platform}"></ng-container></div>
                  </expandable>
                  @if(platform()?.partners?.length > 0){
                      <expandable>
                          <div title>Project Partners</div>
                          <div content><ng-container *ngTemplateOutlet="partnerTemplate; context: {$implicit: platform}"></ng-container></div>
                      </expandable>
                  }
                 @if(platform()?.about){
                    <expandable>
                        <div title>About Data</div>
                        <div content><ng-container *ngTemplateOutlet="aboutTemplate; context: {$implicit: platform}"></ng-container></div>
                    </expandable>
                 }
              </div>
          </div>
      </quarter-grid>

      <ng-template #descriptionTemplate>
          <div class="tab-content">
              @if(platform()?.description){
                  <p [innerHTML]="platform()?.description"></p>
              }
              @else{
                  <p><span class="capitalize">{{ platform()?.name }}</span> is the participatory surveillance system of {{ platform()?.country.name }}</p>
              }
              <div class="actions">
                  @if(platform()?.website){
                      <a class="button button-accent inverted mb-1" [href]="platform()?.website" target="_blank">View the platform</a>
                  }
                  @if(platform()?.websiteJoinLink){
                      <a class="button button-accent mb-1" [href]="platform()?.websiteJoinLink" target="_blank">Join {{ platform().name }}</a>
                  }
              </div>
          </div>
      </ng-template>
      <ng-template #partnerTemplate>
          <div class="tab-content">
              @for (partner of platform()?.partners; track partner.id) {
                  <div class="partner">
                      <a [hidden]="!partner" [href]="partner.website" target="_blank">
                          <strong class="link">{{ partner.name }}</strong>
                          <span class="arrow"><i class="fa-solid fa-arrow-right mobile-hidden"></i></span>
                      </a>
                      <p [hidden]="!partner" [innerHTML]="partner.description" ></p>
                  </div>
              }
          </div>
      </ng-template>
      <ng-template #aboutTemplate>
          <div class="tab-content"><p [innerHTML]="platform()?.about"></p></div>
      </ng-template>
  `,
  styles:  // Language=SCSS
    `
      @import "theme-variables";
      @import "global";
      :host{
        display: flex;
        .tab-content {
          @extend .t-1;
          @media all and (max-width: $mobile-break) {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        .platform-name { @extend .b-1;}
        .actions {
          display: flex;
          @extend .t-2;

          @media all and (max-width: $mobile-break) {
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
          }
          & > * {@extend .mr-1;}
        }

        & ::ng-deep{
          .mdc-tab-indicator > *{ margin-bottom: -1px; }
          .mat-mdc-tab-labels{ border-bottom: solid 1px $color-base-accent-dark; }
        }

        .partner {
          min-width: 100%;
          padding-bottom: 1rem;
        }
        .arrow{
          @extend .color-accent;
          margin-left: 0.5rem;
          & > * {
            text-decoration: none!important;
          }
          i{
            transform: rotate(-45deg);
          }
        }
      }
  `,
})
export class PlatformSummaryComponent {
  public platform: InputSignal<Platform> = input();
}

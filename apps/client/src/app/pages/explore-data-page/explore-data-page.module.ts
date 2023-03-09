import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreDataPageComponent } from './explore-data-page.component';
import { PlatformModule } from '../../feature/platform/platform.module';
import { SwipeableContainerComponent } from '../../layout/partials/swipeable-container/swipeable-container.component';
import { SwiperModule } from 'swiper/angular';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [ExploreDataPageComponent],
  imports: [
    CommonModule,
    PlatformModule,
    SwipeableContainerComponent,
    SwiperModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
})
export class ExploreDataPageModule {}

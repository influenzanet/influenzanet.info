import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPageComponent } from './project-page.component';
import {PlatformModule} from "../../feature/platform/platform.module";
import {QuarterGridComponent} from "../../layout/partials/quarter-grid/quarter-grid.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [ProjectPageComponent],
    imports: [CommonModule, PlatformModule, QuarterGridComponent, RouterModule],
})
export class ProjectPageModule {}

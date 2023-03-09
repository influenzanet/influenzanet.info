import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutDataPageComponent } from './about-data-page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GlossaryAccordionComponent } from './glossary-accordion/glossary-accordion.component';
import {QuarterGridComponent} from "../../layout/partials/quarter-grid/quarter-grid.component";

@NgModule({
  declarations: [AboutDataPageComponent, GlossaryAccordionComponent],
    imports: [CommonModule, MatExpansionModule, MatIconModule, RouterModule, QuarterGridComponent],
})
export class AboutDataPageModule {}

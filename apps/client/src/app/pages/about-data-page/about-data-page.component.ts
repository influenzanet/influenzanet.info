import { Component } from '@angular/core';
import { GlossaryAccordionComponent } from './glossary-accordion/glossary-accordion.component';
import { QuarterGridComponent } from '../../layout/partials/quarter-grid/quarter-grid.component';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'influenza-net-about-data-page',
    templateUrl: './about-data-page.component.html',
    styleUrls: ['./about-data-page.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        QuarterGridComponent,
        GlossaryAccordionComponent,
    ],
})
export class AboutDataPageComponent{}

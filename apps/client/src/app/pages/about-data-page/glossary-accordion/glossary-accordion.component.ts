import { Component, OnInit } from '@angular/core';
import {Glossary, glossaryList} from "../about-data-page.data";
import { NgFor, NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'glossary-accordion',
    templateUrl: './glossary-accordion.component.html',
    styleUrls: ['./glossary-accordion.component.scss'],
    standalone: true,
    imports: [
        MatExpansionModule,
        NgFor,
        NgIf,
    ],
})
export class GlossaryAccordionComponent implements OnInit {
  public glossaryList: Glossary[]

  constructor() {
    this.glossaryList = glossaryList
  }

  ngOnInit(): void {}
}

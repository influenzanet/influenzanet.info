import { Component, OnInit } from '@angular/core';
import {Glossary, glossaryList} from "../about-data-page.data";

@Component({
  selector: 'glossary-accordion',
  templateUrl: './glossary-accordion.component.html',
  styleUrls: ['./glossary-accordion.component.scss'],
})
export class GlossaryAccordionComponent implements OnInit {
  public glossaryList: Glossary[]

  constructor() {
    this.glossaryList = glossaryList
  }

  ngOnInit(): void {}
}

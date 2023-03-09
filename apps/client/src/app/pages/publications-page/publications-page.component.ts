import { Component, OnInit } from '@angular/core';
import {PublicationDataProvider} from "../../feature/publication/publication-data.provider";
import {Publication} from "@models/Publication";
import {orderBy} from "lodash/fp";
import {map, Observable} from "rxjs";

@Component({
  selector: 'influenza-net-publications-page',
  templateUrl: './publications-page.component.html',
  styleUrls: ['./publications-page.component.scss'],
})
export class PublicationsPageComponent implements OnInit {

  public publicationList$: Observable<Publication[]>
  constructor(private publicationDataProvider: PublicationDataProvider) {}

  ngOnInit(): void {
    // Get "Publication list" data
    // Order by publication date, most recent on top
    this.publicationList$ = this.publicationDataProvider.publicationList$.pipe(
      map((publicationList: Publication[])=><Publication[]>orderBy('publicationDate', 'desc')(publicationList))
    )
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map, Observable} from "rxjs";
import {shareReplay} from 'rxjs/operators';
import {plainToInstance} from 'class-transformer';
import {Publication} from "@models/Publication";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PublicationDataProvider {
  public publicationList$: Observable<Publication[]>

  constructor(private http: HttpClient) {

    // Get "Publication List" data,
    // Apply IC to make http-request only if at least one component subscribe to the observable
    // ShareReplay to avoid duplicate requests
    this.publicationList$ = this.http.get<Publication[]>(`${environment.apiBaseUrl}/publication`).pipe(
      map((publication:Publication[])=>plainToInstance(Publication, publication)),
      shareReplay(1)
    )
  }
}

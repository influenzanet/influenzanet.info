import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import {shareReplay} from 'rxjs/operators';
import {plainToInstance} from 'class-transformer';
import {environment} from "../../../environments/environment";
import {News} from "@models/News";


@Injectable({
  providedIn: 'root'
})
export class NewsDataProvider {
  public newsList$: Observable<News[]>

  constructor(private http: HttpClient) {

    // Get "Publication List" data,
    // Apply IC to make http-request only if at least one component subscribe to the observable
    // ShareReplay to avoid duplicate requests
    this.newsList$ = this.http.get<News[]>(`${environment.apiBaseUrl}/news`).pipe(
      map((news:News[])=>plainToInstance(News, news)),
      shareReplay(1)
    )
  }

  getNewsById(id: number): Observable<News> {
    return this.newsList$.pipe(
      map((news:News[])=>news.find((news)=>news.id === id))
    )
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, switchMap, forkJoin, catchError, tap} from "rxjs";
import {shareReplay} from 'rxjs/operators';
import {Platform} from "@models/Platform";
import {plainToInstance} from 'class-transformer';
import {parse as csv} from 'papaparse'
import {
  PlatformData,
  PlatformDataActive,
  PlatformDataIncidence,
  platformDataResponse,
  platformDataResponseFeature,
  platformDataType,
  PlatformDataVisitsCumulated
} from "@models/PlatformData";
import {environment} from "../../../environments/environment";
import {PlatformDataTransformer} from "./platform-data.transformer";

@Injectable({
  providedIn: 'root'
})
export class PlatformDataProvider {
  public platformList$: Observable<Platform[]>
  public platformWithData$: Observable<Platform[]>

  constructor(
    private http: HttpClient
  ) {
    // Get "Platform List" data,
    // Apply IC to make http-request only if at least one component subscribe to the observable
    // ShareReplay to avoid duplicate requests
    this.platformList$ = this.http.get<Platform[]>(`${environment.apiBaseUrl}/platform`).pipe(
      map((platformList:Platform[])=>plainToInstance(Platform, platformList)),
      shareReplay(1)
    )

    // Get "Platform List" data with "Platform stats",
    // Apply IC to make http-request only if at least one component subscribe to the observable
    // ShareReplay to avoid duplicate requests,
    // reuse the data from this.platformList$ if was already requested from another component
    this.platformWithData$ = this.platformList$.pipe(
      switchMap((platformList:Platform[])=>PlatformDataTransformer.transform(platformList)),
      shareReplay(1)
    )
  }
}

import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Partner } from "@models/Partner";
import { shareReplay, map } from "rxjs/operators";
import { PlatformDataProvider } from "@app/feature/platform/platform-data.provider";
import { Platform } from "@models/Platform";
import { flow, map as loMap } from "lodash";
import { orderBy as _orderBy, flatMap as _flatMap, filter as _filter } from "lodash/fp";


@Injectable({
  providedIn: 'root'
})
export class PartnerDataProvider {
  private http: HttpClient = inject(HttpClient)
  private platformDataProvider: PlatformDataProvider = inject(PlatformDataProvider)
  public partnerList$: Observable<Partner[]>

  constructor() {
    this.partnerList$ = this.platformDataProvider.platformList$.pipe(
      map((platformList: Platform[]): Partner[] =>
        flow(
          _flatMap<Platform, Partner>(
            (platform: Platform) => loMap(platform.partners, (partner: Partner) =>new Partner({...partner, platform}))
          ),
          _filter<Partner>((partner: Partner) => !partner.hidden),
          _orderBy(['order'], ['asc'])
        )(platformList) as Partner[]
      ),
      shareReplay(1)
    )
  }
}

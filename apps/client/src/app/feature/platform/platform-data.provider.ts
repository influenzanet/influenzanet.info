import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, switchMap } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { Platform } from "@models/Platform";
import { plainToInstance } from "class-transformer";
import { environment } from "@src/environments/environment";
import { PlatformDataTransformer } from "./platform-data.transformer";
import { flow , orderBy} from "lodash";
import { groupBy as _groupBy, map as _map, orderBy as _orderBy } from "lodash/fp";
import { Country } from "@models/Country";
import {Partner} from "@models/Partner";


@Injectable({
  providedIn: 'root'
})
export class PlatformDataProvider {
  public platformList$: Observable<Platform[]>
  public platformListWithData$: Observable<Platform[]>
  public countryList$: Observable<Country[]>
  public countryListActive$: Observable<Country[]>

  constructor(
    private http: HttpClient
  ) {
    // Get "Platform List" from API,
    // Apply IC to make http-request only if at least one component subscribe to the observable
    // ShareReplay to avoid duplicate requests
    this.platformList$ = this.http.get<Platform[]>(`${environment.apiBaseUrl}/platform`).pipe(
      map((platformList:Platform[])=>{
        const platformToInstance = plainToInstance(
          Platform,
          orderBy(platformList, ['order'], ['asc']),
          { enableImplicitConversion: true }
        )
        return platformToInstance.filter((platform: Platform)=>platform.hidden!==true && platform.country.hidden!==true)
          .map((platform: Platform)=>{
            platform.partners = platform.partners.filter((p: Partner)=>p.hidden!==true)
            return platform
          })
      }),
      shareReplay(1)
    )

    // Get "Platform List" from API and enrich with "Platform stats",
    // Apply IC to make http-request only if at least one component subscribe to the observable
    // ShareReplay to avoid duplicate requests,
    // reuse the data from this.platformList$ if was already requested from another component
    this.platformListWithData$ = this.platformList$.pipe(
      switchMap((platformList:Platform[])=>PlatformDataTransformer.transform(platformList)),
      shareReplay(1)
    )

    // Get "Platform List" from API and turn it into a "Country List",
    // Apply IC to make http-request only if at least one component subscribe to the observable
    // ShareReplay to avoid duplicate requests
    // reuse the data from this.platformListWithData$ if was already requested from another component
    this.countryList$ = this.platformListWithData$.pipe(
      map<Platform[], Country[]>((platformList: Platform[])=>PlatformDataProvider.platformListToCountryList(platformList)),
      shareReplay(1)
    )
    this.countryListActive$ = this.countryList$.pipe(map((countryList: Country[])=>
      countryList.filter((country: Country)=> country.hidden !== true && country.platforms.length > 0))
    )
  }

  // Turn a Platform list into a Country list
  public static platformListToCountryList(platformList: Platform[]): Country[]{
    return flow(
      _groupBy('country.name'),
      _map((platformsGroupedByCountry: Platform[])=>{
        let country = platformsGroupedByCountry[0].country
        return new Country({...country, platforms: platformsGroupedByCountry})
      }),
      _orderBy(['platforms[0].order'],['asc'])
    )(platformList)
  }
}

import { Component, OnInit } from '@angular/core';
import {Platform} from "@models/Platform";
import {Country} from "@models/Country";
import {PlatformDataProvider} from "../../feature/platform/platform-data.provider";
import {Observable, map} from "rxjs";
import {flow} from "lodash";
import {groupBy , map as _map, orderBy} from "lodash/fp";


@Component({
  selector: 'influenza-net-explore-data-page',
  templateUrl: './explore-data-page.component.html',
  styleUrls: ['./explore-data-page.component.scss'],
})
export class ExploreDataPageComponent implements OnInit {
  public countryList$: Observable<Country[]>
  constructor(private platformDataProvider: PlatformDataProvider) {}

  ngOnInit(): void {
    // Get "Platform list" data and enrich every platform with country info
    // Order Alphabetically by country name
    this.countryList$ = this.platformDataProvider.platformWithData$.pipe(
      map((platformList: Platform[])=>{
        return flow(
          groupBy('country.name'),
          _map((platformsGroupedByCountry: Platform[])=>{
            let country = platformsGroupedByCountry[0].country
            return new Country({...country, platforms: platformsGroupedByCountry})
          }),
          orderBy(['platforms[0].order'],['asc'])
        )(platformList)
      })
    )
  }

  // Scroll to specific platform section
  public scrollTo(elementId: string){
    let target = document.getElementById(elementId)
    let nav = document.getElementsByTagName('main-navigation')[0]

    if(!!target){
      let pos = target.getBoundingClientRect()
      window.scrollTo({
        left:pos.left,
        top:pos.top - nav.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  // Check if platform data is updated
  public isPlatformDataUpdated(dataList: boolean[]):boolean{ return dataList.filter((x:boolean)=>!!x).length >= 2 }

  // PERFORMANCE: avoid rendering parts of templates that are not updated
  public trackCountries(index:number, country: Country){ return country.id }
  public trackPlatforms(index:number, platform: Platform){ return platform.id }
}


import { Component, OnInit } from '@angular/core';
import {plainToInstance} from 'class-transformer'
import {Platform} from "@models/Platform";
import {Country} from "@models/Country";
import { PlatformCardGridComponent } from '../../feature/platform/platform-card-grid/platform-card-grid.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'influenza-net-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.scss'],
    standalone: true,
    imports: [RouterLink, PlatformCardGridComponent],
})
export class ProjectPageComponent implements OnInit {

  public projectList: any[]
  constructor() {}

  ngOnInit(): void {
    // Static project data
    this.projectList = [
      {
        country: new Country({name: 'Grant agreement ID: 101003688 (13 Mar 2020 - 12 Apr 2023)'}),
        logo:{key:'logo/EUproject/epipose_europeanproject_logo.png'},
        name: 'EpiPose',
        website: 'https://cordis.europa.eu/project/id/101003688',
        description: 'Epidemic intelligence to minimize 2019-nCoV’s public health, economic and social impact in Europe\n',
        type: 'Project'
      },
      {
        country: new Country({name: 'Grant Agreement ID: 883285 (1 Feb 2021 - 31 Jul 2023)'}),
        logo: {key: 'logo/EUproject/pandem-2_europeanproject_logo.png'},

        name: 'PANDEM-2',
        website: 'https://pandem-2.eu/',
        description: 'Pandemic Preparedness and Response\n',
        type: 'Project'
      },
      {
        country: new Country({name: 'Grant agreement ID: 101045989 (1 Nov 2021 - 31 Oct 2025)'}),
        logo:  {key:'logo/EUproject/verdi_europeanproject_logo.png'},
        name: 'VERDI',
        website: 'https://verdiproject.org/',
        description: 'SARS-coV2 variants Evaluation in pRegnancy and paeDIatrics cohorts\n',
        type: 'Project'
      }
    ]
    // this.projectList = projectData.map((p:any)=>plainToInstance(Platform, p))
  }

  // Scroll to specific Project section
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
}

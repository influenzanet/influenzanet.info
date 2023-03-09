
import { Component, OnInit } from '@angular/core';
import {plainToInstance} from 'class-transformer'
import {Platform} from "@models/Platform";
import {Country} from "@models/Country";

@Component({
  selector: 'influenza-net-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {

  public projectList: Platform[]
  constructor() {}

  ngOnInit(): void {
    // Static project data
    let projectData = [
      {
        country: new Country({name: 'Grant agreement ID: 101003688'}),
        logo:'assets/img/logo/EUproject/epipose_europeanproject_logo.png',
        name: 'EpiPose',
        website: 'https://cordis.europa.eu/project/id/101003688',
        descriptionShort: 'Epidemic intelligence to minimize 2019-nCoV’s public health, economic and social impact in Europe\n',
      },
      {
        country: new Country({name: 'Grant Agreement No. 883285'}),
        logo:  'assets/img/logo/EUproject/pandem-2_europeanproject_logo.png',
        name: 'PANDEM-2',
        website: 'https://pandem-2.eu/',
        descriptionShort: 'Pandemic Preparedness and Response\n',
      },
      {
        country: new Country({name: 'Grant agreement ID: 101045989'}),
        logo:  'assets/img/logo/EUproject/verdi_europeanproject_logo.png',
        name: 'VERDI',
        website: 'https://verdiproject.org/',
        descriptionShort: 'SARS-coV2 variants Evaluation in pRegnancy and paeDIatrics cohorts\n',
      }
    ]
    this.projectList = projectData.map((p:any)=>plainToInstance(Platform, p))
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

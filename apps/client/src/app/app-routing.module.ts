import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExploreDataPageComponent} from "./pages/explore-data-page/explore-data-page.component";
import {AboutDataPageComponent} from "./pages/about-data-page/about-data-page.component";
import {ProjectPageComponent} from "./pages/project-page/project-page.component";
import {TeamPageComponent} from "./pages/team-page/team-page.component";
import {PublicationsPageComponent} from "./pages/publications-page/publications-page.component";

export type navigationData = {
  title: string
}

const routes: Routes = [
  {path: '', redirectTo: '/explore-data', pathMatch: 'full'},
  {
    path: 'explore-data',
    component: ExploreDataPageComponent,
    data: {title:'Explore our data'}
  },
  {
    path: 'about-data',
    component: AboutDataPageComponent,
    data: {title:'About our data'}
  },
  {
    path: 'project',
    component: ProjectPageComponent,
    data: {title:'The project'}
  },
  {
    path: 'team',
    component: TeamPageComponent,
    data: {title:'Our Team'}
  },
  {
    path: 'publications',
    component: PublicationsPageComponent,
    data: {title:'Publications'}
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

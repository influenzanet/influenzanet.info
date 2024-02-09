import { inject, NgModule } from "@angular/core";
import { RouteReuseStrategy, RouterModule, Routes } from "@angular/router";
import { ExploreDataPageComponent } from "./pages/explore-data-page/explore-data-page.component";
import { AboutDataPageComponent } from "./pages/about-data-page/about-data-page.component";
import { ProjectPageComponent } from "./pages/project-page/project-page.component";
import { TeamPageComponent } from "./pages/team-page/team-page.component";
import { PublicationsPageComponent } from "./pages/publications-page/publications-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { NewsPageComponent } from "@app/pages/news-page/news-page.component";
import { NewsDetailPageComponent } from "@app/pages/news-detail-page/news-detail-page.component";
import { AppRouteReuseStrategy } from "@app/app-route-reuse-strategy";
import { RoutingService } from "@app/app-routing.service";

export type navigationData = {title: string, showPageTitle?: boolean, storeRoute?: boolean}

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomePageComponent,
    data: {title:'InfluenzaNet Home', showPageTitle: false, storeRoute: true}
  },
  {
    path: 'explore-data',
    component: ExploreDataPageComponent,
    // data: {title:'Explore our data', storeRoute: true}
    data: {title:'Explore our data', storeRoute: false}
  },
  {
    path: 'about-data',
    component: AboutDataPageComponent,
    data: {title:'About our data', storeRoute: true}
  },
  {
    path: 'project',
    component: ProjectPageComponent,
    data: {title:'The project', storeRoute: true}
  },
  {
    path: 'team',
    component: TeamPageComponent,
    data: {title:'Our Team', storeRoute: true}
  },
  {
    path: 'publications',
    component: PublicationsPageComponent,
    data: {title:'Publications', showPageTitle: false, storeRoute: true}
  },
  {
    path: 'news',
    component: NewsPageComponent,
    data: {title:'News', showPageTitle: false, storeRoute: true}
  },
  {
    path: 'news/:id',
    component: NewsDetailPageComponent,
    data: {storeRoute: false}
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
      scrollPositionRestoration: "disabled",
      anchorScrolling: 'enabled',
      enableViewTransitions: true,
      scrollOffset: [0, 128],
    })
  ],
  exports: [RouterModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy}
  ]
})
export class AppRoutingModule {
  // This is required to have at least one instance of RoutingService
  private routingService: RoutingService = inject(RoutingService)
}

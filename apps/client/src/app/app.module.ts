import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MainFooterComponent} from './layout/main-footer/main-footer.component';
import {PageTitleComponent} from './layout/partials/page-title/page-title.component';
import {BackToTopComponent} from './layout/partials/back-to-top/back-to-top.component';

import {ExploreDataPageModule} from './pages/explore-data-page/explore-data-page.module';
import {AboutDataPageModule} from './pages/about-data-page/about-data-page.module';
import {ProjectPageModule} from './pages/project-page/project-page.module';
import {TeamPageModule} from './pages/team-page/team-page.module';
import {PublicationsPageModule} from './pages/publications-page/publications-page.module';
import {MainNavigationComponent} from "./layout/main-navigation/main-navigation.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NoopAnimationsModule,
    HttpClientModule,
    RouterModule,
    // Partial & Layout
    MainNavigationComponent,
    MainFooterComponent,
    PageTitleComponent,
    BackToTopComponent,
    // Pages
    ExploreDataPageModule,
    ProjectPageModule,
    PublicationsPageModule,
    TeamPageModule,
    AboutDataPageModule,
    // Manatain as last import
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

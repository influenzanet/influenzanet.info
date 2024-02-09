import { APP_ID, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainFooterComponent } from "./layout/main-footer/main-footer.component";
import { PageTitleComponent } from "./layout/partials/page-title/page-title.component";
import { BackToTopComponent } from "./layout/partials/back-to-top/back-to-top.component";
import { MainNavigationComponent } from "./layout/main-navigation/main-navigation.component";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    // NoopAnimationsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    // Partial & Layout
    MainNavigationComponent,
    MainFooterComponent,
    PageTitleComponent,
    BackToTopComponent,
    MatSelectModule,
    // Mantain as last import
    AppRoutingModule,
  ],
  providers: [{ provide: APP_ID, useValue: "serverApp" }, ],
  bootstrap: [AppComponent],
})
export class AppModule {}

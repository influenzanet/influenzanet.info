import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeHeroComponent } from "@app/pages/home-page/sections/home-hero.component";
import { HomeGoalComponent } from "@app/pages/home-page/sections/home-goal.component";
import { HomeLatestNewsComponent } from "@app/pages/home-page/sections/home-latest-news.component";
import { HomeHowDoesItWorkComponent } from "@app/pages/home-page/sections/home-howdoesitwork.component";
import { HomePartnerCarouselComponent } from "@app/pages/home-page/sections/home-partner-carousel.component";


@Component({
  selector: "influenza-net-home-page",
  standalone: true,
  imports: [CommonModule, HomeHeroComponent, HomeGoalComponent, HomeHowDoesItWorkComponent, HomeLatestNewsComponent, HomePartnerCarouselComponent],
  template: `
    <section class="b-6"> <home-hero/> </section>
    <section class="space-x tb-4"> <home-goal/> </section>
    <section class="space-x tb-4"> <home-howdoesitwork/> </section>
    <section class="space-x tb-4 bg-base-accent"> <home-partner-carousel/> </section>
    <section class="space-x t-4 b-6"> <home-latest-news/> </section>
  `
})
export class HomePageComponent {}

import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {debounceTime, filter} from "rxjs";

@Component({
  selector: 'influenza-net-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      debounceTime(100)
    ).subscribe((x: NavigationEnd)=>{  window.scrollTo(0,0) })
  }
}

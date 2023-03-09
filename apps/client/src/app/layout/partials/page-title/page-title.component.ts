import {Component} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {debounceTime, filter} from "rxjs";


@Component({
  standalone: true,
  selector: 'page-title',
  imports: [],
  template: `<h1>{{ title }}</h1>`,
  styleUrls: ['page-title.component.scss']
})
export class PageTitleComponent {
  public title:string

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.title = ''
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      debounceTime(100)
    )
    .subscribe((x: NavigationEnd)=>{
      this.title = this.activatedRoute.firstChild?.snapshot.data['title']
    })
  }
}

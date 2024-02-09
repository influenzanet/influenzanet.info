import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { News } from "@models/News";
import { NewsDataProvider } from "@app/feature/news/news-data.provider";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { PageTitleComponent } from "@app/layout/partials/page-title/page-title.component";
import { QuarterGridComponent } from "@app/layout/partials/quarter-grid/quarter-grid.component";
import { TrustHtmlPipe } from "@app/feature/ui/utils/TrustHtmlPipe";


@Component({
  selector: 'influenza-net-news-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, QuarterGridComponent, PageTitleComponent, TrustHtmlPipe],
  templateUrl : './news-detail-page.component.html',
  styleUrls: ['./news-detail-page.component.scss']
})
export class NewsDetailPageComponent implements OnInit {
  newsId: string;
  news: News;

  constructor(
    private route: ActivatedRoute,
    private newsDataProvider: NewsDataProvider
  ) {}

  ngOnInit(): void {
    this.newsId = this.route.snapshot.paramMap.get('id');
    this.newsDataProvider.getNewsById(Number(this.newsId)).subscribe((news) => {
      this.news = news;
    });
  }
}

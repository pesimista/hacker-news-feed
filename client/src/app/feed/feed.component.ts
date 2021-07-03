import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Article } from '../core/models/articles.model';
import { ArticlesService } from '../core/services/articles.service';

let _this: FeedComponent;
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  items: Article[] = [];
  now = new Date();
  constructor(private articlesService: ArticlesService) {
    _this = this;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.setItems([]);
    this.articlesService.getArticles().subscribe(this.setItems);
  }

  hideArticle(item: Article): void {
    this.articlesService
      .hideArticles(item.story_id)
      .pipe(switchMap(() => this.articlesService.getArticles()))
      .subscribe(this.setItems);
  }

  setItems(response: Article[]) {
    _this.now = new Date();
    _this.items = response.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

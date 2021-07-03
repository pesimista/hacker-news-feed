import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../models/articles.model';
import { take, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  server = environment.serverURI;

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    const url = this.server + 'articles';
    console.log(url);
    return this.http.get<Article[]>(url).pipe(
      // take(1),
      map((items) =>
        items.reduce((col, item) => {
          if (!item.story_title && !item.title) {
            return col;
          }
          item.createdAt = new Date(item.created_at);
          return [...col, item];
        }, [] as Article[])
      ),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  hideArticles(story_id: number): Observable<boolean> {
    const url = this.server + 'articles/' + story_id.toString();
    return this.http.delete<boolean>(url).pipe(take(1));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Article } from '../articles/article.model';
import { ArticleService } from '../articles/article.service';

const url = 'http://localhost:8080/articles';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private articleService: ArticleService) {}

  fetchArticles() {
    return this.http
    .get<Article[]>(
      url
    )
    .pipe(
      tap((articles) => {
        this.articleService.setArticles(articles);
      })
    )
  }

}

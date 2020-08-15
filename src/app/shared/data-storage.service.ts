import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Article } from '../articles/article.model';
import { ArticleService } from '../articles/article.service';
import { ArticlesComponent } from '../articles/articles.component';
import { ArticleCategory } from '../articles/article-category.model';

const url = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private articleService: ArticleService
  ) {}

  fetchArticles() {
    return this.http.get<Article[]>(url + 'articles').pipe(
      tap((articles) => {
        this.articleService.setArticles(articles);
      })
    );
  }

  fetchCategories() {
    return this.http.get<ArticleCategory[]>(url + 'categories').pipe(
      tap((categories) => {
        this.articleService.setCategories(categories);
      })
    );
  }

  saveNewestArticle() {
    const articles = this.articleService.getArticles();
    const newArticle = articles[articles.length - 1];
    console.log(newArticle);
    return this.http
      .post(url + 'articles', newArticle)
      .subscribe((response) => {
        console.log(response);
      });
  }
}

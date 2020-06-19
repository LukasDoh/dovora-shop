import { Injectable } from '@angular/core';

import { Article } from './article.model';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articlesChanged = new Subject<Article[]>();

  private articles: Article[] = [];

  constructor() {}

  setArticles(articles: Article[]) {
    this.articles = articles;
    this.articlesChanged.next(this.articles.slice());
    console.log(this.articles)
  }

  getArticles() {
    return this.articles.slice();
  }

  getArticle(id: number) {
    return this.articles.find(x => x.id == id);
  }
}

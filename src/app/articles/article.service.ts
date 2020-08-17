import { Injectable } from '@angular/core';

import { Article } from './article.model';
import { Subject } from 'rxjs';
import { ArticleCategory } from './article-category.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articlesChanged = new Subject<Article[]>();
  categoriesChanged = new Subject<ArticleCategory[]>();

  private articles: Article[] = [];
  private categories: ArticleCategory[] = [];

  constructor() {}

  setArticles(articles: Article[]) {
    this.articles = articles;
    this.articlesChanged.next(this.articles.slice());
  }

  setCategories(categories: ArticleCategory[]) {
    this.categories = categories;
    this.categoriesChanged.next(this.categories.slice());
  }

  getArticles() {
    return this.articles.slice();
  }

  getLastArticle() {
    return this.articles[this.articles.length - 1];
  }

  getCategories() {
    return this.categories.slice();
  }

  getArticle(id: number) {
    return this.articles.find((x) => x.id == id);
  }

  updateArticle(article: Article) {
    
  }

  getCategory(id: number) {
    return this.categories.find((x) => x.id == id);
  }

  addArticle(article: Article) {
    this.articles.push(article);
    this.articlesChanged.next(this.articles.slice());
  }

  addCategory(category: ArticleCategory) {
    this.categories.push(category);
    this.categoriesChanged.next(this.categories.slice());
  }
}

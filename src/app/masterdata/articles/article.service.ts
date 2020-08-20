import { Injectable, ComponentFactoryResolver } from '@angular/core';

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

  getLastCategory() {
    return this.categories[this.categories.length -1];
  }

  getArticle(id: number) {
    return this.articles.find((x) => x.id == id);
  }

  getCategory(id: number) {
    return this.categories.find((x) => x.id == id);
  }

  addArticle(article: Article) {
    this.articles.push(article);
    this.articlesChanged.next(this.articles.slice());
  }

  updateArticle(article: Article) {
    const callback = (element) => element.id === article.id;
    const index: number = this.articles.findIndex(callback);
    if (index !== -1) {
      this.articles[index] = article
      this.articlesChanged.next(this.articles.slice());
    }
  }

  removeArticle(article: Article) {
    const callback = (element) => element.id === article.id;
    const index: number = this.articles.findIndex(callback);
    if (index !== -1) {
      this.articles.splice(index, 1);
      this.articlesChanged.next(this.articles.slice());
    }
  }

  addCategory(category: ArticleCategory) {
    this.categories.push(category);
    this.categoriesChanged.next(this.categories.slice());
  }

  updateCategory(category: ArticleCategory) {
    const callback = (element) => element.id === category.id;
    const index: number = this.categories.findIndex(callback);
    if (index !== -1) {
      this.categories[index] = category
      this.categoriesChanged.next(this.categories.slice());
    }
  }

  removeCategory(category: ArticleCategory) {
    const callback = (element) => element.id === category.id;
    const index: number = this.categories.findIndex(callback);
    if (index !== -1) {
      this.categories.splice(index, 1);
      this.categoriesChanged.next(this.categories.slice());
    }
  }
}

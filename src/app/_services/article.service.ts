import { Injectable } from '@angular/core';

import { Article } from '../masterdata/articles/article.model';
import { Subject } from 'rxjs';
import { ArticleCategory } from '../masterdata/articles/article-category.model';

/**
 * Article Service: Interacts with article list.
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articlesChanged = new Subject<Article[]>();
  categoriesChanged = new Subject<ArticleCategory[]>();

  private articles: Article[] = [];
  private categories: ArticleCategory[] = [];

  constructor() {}

  /**
   * Sets articles
   * @param articles
   */
  setArticles(articles: Article[]) {
    this.articles = articles;
    this.articlesChanged.next(this.articles.slice());
  }

  /**
   * Sets categories
   * @param categories
   */
  setCategories(categories: ArticleCategory[]) {
    this.categories = categories;
    this.categoriesChanged.next(this.categories.slice());
  }

  /**
   * Gets articles
   * @returns
   */
  getArticles() {
    return this.articles.slice();
  }

  /**
   * Gets articles by category
   * @param category
   * @returns articles by category
   */
  getArticlesByCategory(category: string): Article[] {
    const filteredArticles: Article[] = this.articles.filter(
      (a) => a.category === category
    );
    return filteredArticles;
  }

  /**
   * Gets last article
   * @returns
   */
  getLastArticle() {
    return this.articles[this.articles.length - 1];
  }

  /**
   * Gets categories
   * @returns
   */
  getCategories() {
    return this.categories.slice();
  }

  /**
   * Gets last category
   * @returns
   */
  getLastCategory() {
    return this.categories[this.categories.length - 1];
  }

  /**
   * Gets article
   * @param id
   * @returns
   */
  getArticle(id: number) {
    return this.articles.find((x) => x.id === id);
  }

  /**
   * Gets category
   * @param id
   * @returns
   */
  getCategory(id: number) {
    return this.categories.find((x) => x.id === id);
  }

  /**
   * Adds article
   * @param article
   */
  addArticle(article: Article) {
    this.articles.push(article);
    this.articlesChanged.next(this.articles.slice());
  }

  /**
   * Updates article
   * @param article
   */
  updateArticle(article: Article) {
    const callback = (element) => element.id === article.id;
    const index: number = this.articles.findIndex(callback);
    if (index !== -1) {
      this.articles[index] = article;
      this.articlesChanged.next(this.articles.slice());
    }
  }

  /**
   * Removes article
   * @param article
   */
  removeArticle(article: Article) {
    const callback = (element) => element.id === article.id;
    const index: number = this.articles.findIndex(callback);
    if (index !== -1) {
      this.articles.splice(index, 1);
      this.articlesChanged.next(this.articles.slice());
    }
  }

  /**
   * Adds category
   * @param category
   */
  addCategory(category: ArticleCategory) {
    this.categories.push(category);
    this.categoriesChanged.next(this.categories.slice());
  }

  /**
   * Updates category
   * @param category
   */
  updateCategory(category: ArticleCategory) {
    const callback = (element) => element.id === category.id;
    const index: number = this.categories.findIndex(callback);
    if (index !== -1) {
      this.categories[index] = category;
      this.categoriesChanged.next(this.categories.slice());
    }
  }

  /**
   * Removes category
   * @param category
   */
  removeCategory(category: ArticleCategory) {
    const callback = (element) => element.id === category.id;
    const index: number = this.categories.findIndex(callback);
    if (index !== -1) {
      this.categories.splice(index, 1);
      this.categoriesChanged.next(this.categories.slice());
    }
  }
}

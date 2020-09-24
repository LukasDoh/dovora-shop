import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';

import { Article } from '../masterdata/articles/article.model';
import { ArticleService } from './article.service';
import { ArticleCategory } from '../masterdata/articles/article-category.model';
import { Observable, from } from 'rxjs';
import { Customer } from '../masterdata/customers/customer.model';
import { CustomerService } from './customer.service';

const url = 'http://localhost:8080/';

/**
 * Data Storage Service: Interacts with rest api and firebase storage.
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  downloadURL: Observable<string>;
  uploadPercent: Observable<number>;

  constructor(
    private http: HttpClient,
    private articleService: ArticleService,
    private customerService: CustomerService,
    private afStorage: AngularFireStorage
  ) {}

  /**
   * Fetches articles
   * @returns
   */
  fetchArticles() {
    return this.http.get<Article[]>(url + 'articles').pipe(
      tap((articles) => {
        this.articleService.setArticles(articles);
      })
    );
  }

  /**
   * Fetches categories
   * @returns
   */
  fetchCategories() {
    return this.http.get<ArticleCategory[]>(url + 'categories').pipe(
      tap((categories) => {
        this.articleService.setCategories(categories);
      })
    );
  }

  /**
   * Fetches customers
   * @returns
   */
  fetchCustomers() {
    return this.http.get<Customer[]>(url + 'customers').pipe(
      tap((customers) => {
        this.customerService.setCustomers(customers);
      })
    );
  }

  /**
   * Updates article
   * @param article
   * @returns
   */
  updateArticle(article: Article) {
    const id: number = article.id;
    return this.http
      .put(url + 'articles/' + id, article)
      .subscribe((response) => {
        console.log(response);
      });
  }

  /**
   * Updates category
   * @param category
   * @returns
   */
  updateCategory(category: ArticleCategory) {
    const id: number = category.id;
    return this.http
      .put(url + 'categories/' + id, category)
      .subscribe((response) => {
        console.log(response);
      });
  }

  /**
   * Updates customer
   * @param customer
   * @returns
   */
  updateCustomer(customer: Customer) {
    const id: number = customer.id;
    return this.http
      .put(url + 'customers/' + id, customer)
      .subscribe((response) => {
        console.log(response);
      });
  }

  /**
   * Deletes article
   * @param id
   * @returns
   */
  deleteArticle(id: number) {
    return this.http.delete(url + 'articles/' + id).subscribe((response) => {
      console.log(response);
    });
  }

  /**
   * Deletes category
   * @param id
   * @returns
   */
  deleteCategory(id: number) {
    return this.http.delete(url + 'categories/' + id).subscribe((response) => {
      console.log(response);
    });
  }

  /**
   * Deletes customer
   * @param id
   * @returns
   */
  deleteCustomer(id: number) {
    return this.http.delete(url + 'customers/' + id).subscribe((response) => {
      console.log(response);
    });
  }

  /**
   * Saves newest article
   * @returns
   */
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

  /**
   * Saves newest category
   * @returns
   */
  saveNewestCategory() {
    const categories = this.articleService.getCategories();
    const newCategory = categories[categories.length - 1];
    return this.http
      .post(url + 'categories', newCategory)
      .subscribe((response) => {
        console.log(response);
      });
  }

  /**
   * Saves newest customer
   * @returns
   */
  saveNewestCustomer() {
    const customers = this.customerService.getCustomers();
    const newCustomer = customers[customers.length - 1];
    return this.http
      .post(url + 'customers', newCustomer)
      .subscribe((response) => {
        console.log(response);
      });
  }

  /**
   * Uploads file to firebase storage
   * @param file
   * @param id
   * @returns file
   */
  uploadFile(file: File, id: number): Observable<string> {
    const path = `images/${id}`;
    const task = this.afStorage.upload(path, file);
    return this.getDownloadUrl(task, path);
  }

  /**
   * Gets download url for uploadFile method
   * @param uploadTask
   * @param path
   * @returns download url
   */
  getDownloadUrl(
    uploadTask: AngularFireUploadTask,
    path: string
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.afStorage.ref(path).getDownloadURL())
    );
  }

  /**
   * Gets url of single image
   * @param id
   * @returns
   */
  getUrl(id: number) {
    const ref = this.afStorage.ref('images/' + id);
    return ref.getDownloadURL();
  }

  /**
   * Deletes file
   * @param id
   */
  deleteFile(id) {
    const ref = this.afStorage.ref('images/' + id);
    ref.delete();
  }
}

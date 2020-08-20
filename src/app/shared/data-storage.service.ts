import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';

import { Article } from '../masterdata/articles/article.model';
import { ArticleService } from '../masterdata/articles/article.service';
import { ArticleCategory } from '../masterdata/articles/article-category.model';
import { Observable, from } from 'rxjs';
import { Customer } from '../masterdata/customers/customer.model';
import { CustomerService } from '../masterdata/customers/customer.service';

const url = 'http://localhost:8080/';

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

  fetchCustomers() {
    return this.http.get<Customer[]>(url + 'customers').pipe(
      tap((customers) => {
        this.customerService.setCustomers(customers);
      })
    );
  }

  updateArticle(article: Article) {
    const id: number = article.id;
    return this.http
      .put(url + 'articles/' + id, article)
      .subscribe((response) => {
        console.log(response);
      });
  }

  updateCategory(category: ArticleCategory) {
    const id: number = category.id;
    return this.http
      .put(url + 'categories/' + id, category)
      .subscribe((response) => {
        console.log(response);
      });
  }

  updateCustomer(customer: Customer) {
    const id: number = customer.id;
    return this.http
      .put(url + 'customers/' + id, customer)
      .subscribe((response) => {
        console.log(response);
      });
  }

  deleteArticle(id: number) {
    return this.http.delete(url + 'articles/' + id).subscribe((response) => {
      console.log(response);
    });
  }

  deleteCategory(id: number) {
    return this.http.delete(url + 'categories/' + id).subscribe((response) => {
      console.log(response);
    });
  }

  deleteCustomer(id: number) {
    return this.http.delete(url + 'customers/' + id).subscribe((response) => {
      console.log(response);
    });
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

  saveNewestCategory() {
    const categories = this.articleService.getCategories();
    const newCategory = categories[categories.length - 1];
    return this.http
      .post(url + 'categories', newCategory)
      .subscribe((response) => {
        console.log(response);
      });
  }

  saveNewestCustomer() {
    const customers = this.customerService.getCustomers();
    const newCustomer = customers[customers.length - 1];
    return this.http
      .post(url + 'customers', newCustomer)
      .subscribe((response) => {
        console.log(response);
      });
  }

  uploadFile(file: File, id: number): Observable<string> {
    const path = `images/${id}`;
    const task = this.afStorage.upload(path, file);
    return this.getDownloadUrl(task, path);
  }

  getDownloadUrl(
    uploadTask: AngularFireUploadTask,
    path: string
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.afStorage.ref(path).getDownloadURL())
    );
  }

  getUrl(id: number) {
    const ref = this.afStorage.ref('images/' + id);
    return ref.getDownloadURL();
  }

  deleteFile(id) {
    const ref = this.afStorage.ref('images/' + id);
    ref.delete();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, finalize, switchMap } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';

import { Article } from '../articles/article.model';
import { ArticleService } from '../articles/article.service';
import { ArticleCategory } from '../articles/article-category.model';
import { Observable, from } from 'rxjs';

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
    private afStorage: AngularFireStorage
  ) {}

  fetchArticles() {
    return this.http.get<Article[]>(url + 'articles').pipe(
      tap((articles) => {
        this.articleService.setArticles(articles);
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

  deleteArticle(id: number) {
    return this.http.delete(url + 'articles/' + id).subscribe((response) => {
      console.log(response);
    });
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

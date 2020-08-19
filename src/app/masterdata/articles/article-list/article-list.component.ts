import { Component, OnInit } from '@angular/core';

import { Article } from '../article.model';
import { Subscription } from 'rxjs';

import { ArticleService } from '../article.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/storage';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  subscription: Subscription;
  articles: Article[] = [];
  articleImage: any;
  faPen = faPen;
  imgUrl = {};

  constructor(
    private articleService: ArticleService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    console.log('INIT');
    console.log(this.articles[0]);
    this.subscription = this.articleService.articlesChanged.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        this.articles.forEach((article) => {
          const ref: AngularFireStorageReference = this.storage.ref(
            '/images/' + article.id
          );
          ref.getDownloadURL().subscribe((value) => {
            this.imgUrl[article.id] = value;
          });
        });
      }
    );
    this.articles = this.articleService.getArticles();
  }

  getImage(id: number) {
    return this.imgUrl[id];
  }
}

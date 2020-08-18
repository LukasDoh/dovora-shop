import { Component, OnInit } from '@angular/core';

import { Article } from '../article.model';
import { Subscription, Observable } from 'rxjs';

import { ArticleService } from '../article.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';

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
    private dataService: DataStorageService,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.articleService.articlesChanged.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        this.articles.forEach(article => {
          const ref: AngularFireStorageReference = this.storage.ref('/images/'+article.id);
          ref.getDownloadURL().subscribe(value => {
            this.imgUrl[article.id] = value;
          })
        });
      }
    );
    this.articles = this.articleService.getArticles();
  }

  getImage(id: number) {
    return this.imgUrl[id];
  }
}

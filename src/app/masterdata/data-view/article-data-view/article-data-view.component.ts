import { Component, OnInit, OnChanges } from '@angular/core';
import { ArticleService } from '../../articles/article.service';
import { Subscription } from 'rxjs';
import { Article } from '../../articles/article.model';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  AngularFireStorageReference,
  AngularFireStorage,
} from '@angular/fire/storage';

@Component({
  selector: 'app-article-data-view',
  templateUrl: './article-data-view.component.html',
  styleUrls: ['./article-data-view.component.css'],
})
export class ArticleDataViewComponent implements OnInit {
  subscription: Subscription;
  articles: Article[] = [];
  faPen = faPen;
  faPlus = faPlus;
  imgUrl = {};

  constructor(
    private articleService: ArticleService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    console.log('peep');
    this.subscription = this.articleService.articlesChanged.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articles = this.articleService.getArticles();
    this.articles.forEach((article) => {
      const ref: AngularFireStorageReference = this.storage.ref(
        '/images/' + article.id
      );
      ref.getDownloadURL().subscribe((value) => {
        this.imgUrl[article.id] = value;
      });
    });
  }

  getImage(id: number) {
    return this.imgUrl[id];
  }
}

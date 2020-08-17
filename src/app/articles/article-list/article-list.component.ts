import { Component, OnInit } from '@angular/core';

import { Article } from '../article.model';
import { Subscription } from 'rxjs';

import { ArticleService } from '../article.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private articleService: ArticleService, private dataService: DataStorageService) {}

  ngOnInit(): void {
    this.subscription = this.articleService.articlesChanged.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articles = this.articleService.getArticles();
  }
}

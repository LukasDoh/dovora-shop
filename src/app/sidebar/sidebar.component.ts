import { Component, OnInit } from '@angular/core';
import { ArticleCategory } from '../masterdata/articles/article-category.model';
import { ArticleService } from '../_services/article.service';
import { Subscription } from 'rxjs';
import { Article } from '../masterdata/articles/article.model';
import { DataStorageService } from '../_services/data-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  subscription: Subscription;
  categories: ArticleCategory[] = [];

  constructor(
    private articleService: ArticleService,
    private dataService: DataStorageService
  ) {}

  ngOnInit() {
    this.subscription = this.articleService.categoriesChanged.subscribe(
      (categories: ArticleCategory[]) => {
        this.categories = categories;
      }
    );
    this.categories = this.articleService.getCategories();
  }
}

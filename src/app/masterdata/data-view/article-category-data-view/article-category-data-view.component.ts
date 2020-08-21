import { Component, OnInit } from '@angular/core';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { ArticleCategory } from '../../articles/article-category.model';
import { ArticleService } from '../../../_services/article.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Component({
  selector: 'app-article-category-data-view',
  templateUrl: './article-category-data-view.component.html',
  styleUrls: ['./article-category-data-view.component.css'],
})
export class ArticleCategoryDataViewComponent implements OnInit {
  faPlus = faPlus;
  faPen = faPen;
  categories: ArticleCategory[] = [];
  subscription: Subscription;

  constructor(
    private articleService: ArticleService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.subscription = this.articleService.categoriesChanged.subscribe(
      (categories: ArticleCategory[]) => {
        this.categories = categories;
      }
    );
    this.categories = this.articleService.getCategories();
  }

  onOpenAdd() {
    const modalRef = this.modalService.open(AddCategoryComponent);
  }

  onOpenEdit(category: ArticleCategory) {
    const modalRef = this.modalService.open(EditCategoryComponent);
    modalRef.componentInstance.category = category;
  }
}

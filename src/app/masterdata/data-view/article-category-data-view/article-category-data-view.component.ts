import { Component, OnInit } from '@angular/core';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { ArticleCategory } from '../../articles/article-category.model';
import { ArticleService } from '../../../_services/article.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

/**
 * Article Category Data View Component: lets employees change article category data.
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
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

  /**
   * on init: subscribe to article category list, gets categories
   */
  ngOnInit(): void {
    this.subscription = this.articleService.categoriesChanged.subscribe(
      (categories: ArticleCategory[]) => {
        this.categories = categories;
      }
    );
    this.categories = this.articleService.getCategories();
  }

  /**
   * Opens modal to add a category
   */
  onOpenAdd() {
    const modalRef = this.modalService.open(AddCategoryComponent);
  }

  /**
   * Opens modal to edit a category
   * @param category
   */
  onOpenEdit(category: ArticleCategory) {
    const modalRef = this.modalService.open(EditCategoryComponent);
    modalRef.componentInstance.category = category;
  }
}

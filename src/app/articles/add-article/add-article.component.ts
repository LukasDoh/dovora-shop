import { Component, OnInit, OnChanges } from '@angular/core';
import { faSave, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Article } from '../article.model';
import { NgForm } from '@angular/forms';
import { ArticleService } from '../article.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Router } from '@angular/router';
import { ArticleCategory } from '../article-category.model';
import { Subscription } from 'rxjs';
import { ArticleModalContainer } from '../article-modal-container.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  subscription: Subscription;
  categories: ArticleCategory[] = [];
  nextArticleId: number = 0;
  faSave = faSave;
  faPlus = faPlusSquare;

  constructor(
    private modalService: NgbModal,
    private activeModals: NgbActiveModal,
    private articleService: ArticleService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.articleService.categoriesChanged.subscribe(
      (categories: ArticleCategory[]) => {
        this.categories = categories;
      }
    );
    this.categories = this.articleService.getCategories();
    this.nextArticleId = this.articleService.getLastArticle().id + 1
  }

  onSaveArticle(form: NgForm, addMultiple: Boolean) {
    const value = form.value;
    const newArticle = new Article(
      value.id,
      value.name,
      'default.jpg',
      value.price,
      value.category
    );
    this.articleService.addArticle(newArticle);
    this.dataStorageService.saveNewestArticle();
    form.reset();
    console.log(addMultiple);
    if (addMultiple === false) {
      this.modalService.dismissAll();
    }
    this.nextArticleId += 1
  }

  onCloseModals() {
    this.modalService.dismissAll();
  }
}

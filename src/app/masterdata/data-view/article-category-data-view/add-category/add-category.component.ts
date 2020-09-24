import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/_services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ArticleCategory } from 'src/app/masterdata/articles/article-category.model';
import { DataStorageService } from 'src/app/_services/data-storage.service';

/**
 * Add Category Component: to add a category via modal
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  faSave = faSave;
  faPlus = faPlus;
  addForm: FormGroup;
  subscription: Subscription;
  categories: ArticleCategory[] = [];
  nextCategoryId: number;

  constructor(
    private activeModal: NgbActiveModal,
    private articleService: ArticleService,
    private dataService: DataStorageService,
    private formBuilder: FormBuilder
  ) {}

  /**
   * on init: subscribe to article categories list, gets categories, determines next category id, builds form
   */
  ngOnInit(): void {
    this.subscription = this.articleService.categoriesChanged.subscribe(
      (categories: ArticleCategory[]) => {
        this.categories = categories;
      }
    );
    this.categories = this.articleService.getCategories();
    this.nextCategoryId = this.articleService.getLastCategory().id + 1;
    this.addForm = this.formBuilder.group({
      id: [{ value: this.nextCategoryId, disabled: true }],
      name: ['', Validators.required],
    });
  }

  /**
   * Saves form content to database
   * @param addMultiple if another has to be added right after
   */
  onSave(addMultiple: Boolean) {
    const value = this.addForm.getRawValue();
    const newCategory = new ArticleCategory(value.id, value.name);
    this.articleService.addCategory(newCategory);
    this.dataService.saveNewestCategory();
    this.addForm.reset();
    if (addMultiple === false) {
      this.activeModal.close();
    }
    this.nextCategoryId += 1;
  }

  /**
   * closes modal
   */
  onCloseModal() {
    this.activeModal.close();
  }
}

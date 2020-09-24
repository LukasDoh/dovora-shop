import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/_services/article.service';
import { DataStorageService } from 'src/app/_services/data-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleCategory } from 'src/app/masterdata/articles/article-category.model';
import { Subscription } from 'rxjs';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

/**
 * Edit Category Component: to edit a category via modal
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  faSave = faSave;
  faTrash = faTrash;
  editForm: FormGroup;
  categories: ArticleCategory[] = [];
  subscription: Subscription;
  @Input() category: ArticleCategory;

  constructor(
    private articleService: ArticleService,
    private dataService: DataStorageService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  /**
   * on init: subscribe to article categories list, gets categories, builds form
   */
  ngOnInit(): void {
    this.subscription = this.articleService.categoriesChanged.subscribe(
      (categories: ArticleCategory[]) => {
        this.categories = categories;
      }
    );
    this.categories = this.articleService.getCategories();
    this.editForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
    });
    this.editForm.setValue(this.category);
  }

  /**
   * Updates data from form in database
   */
  onSave() {
    this.articleService.updateCategory(this.editForm.getRawValue());
    this.dataService.updateCategory(this.editForm.getRawValue());
    this.activeModal.close();
  }

  /**
   * Deletes a category
   */
  onDelete() {
    const id = this.editForm.get('id').value;
    this.articleService.removeCategory(this.editForm.getRawValue());
    this.dataService.deleteCategory(id);
    this.activeModal.close();
  }

  /**
   * closes modal
   */
  onClose() {
    this.activeModal.close();
  }
}

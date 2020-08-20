import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/masterdata/articles/article.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleCategory } from 'src/app/masterdata/articles/article-category.model';
import { Subscription } from 'rxjs';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

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
    private modalService: NgbModal,
    private articleService: ArticleService,
    private dataService: DataStorageService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

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

  onSave() {
    this.articleService.updateCategory(this.editForm.getRawValue());
    this.dataService.updateCategory(this.editForm.getRawValue());
    this.activeModal.close();
  }

  onDelete() {
    const id = this.editForm.get('id').value;
    this.articleService.removeCategory(this.editForm.getRawValue());
    this.dataService.deleteCategory(id);
    this.activeModal.close();
  }

  onClose() {
    this.activeModal.close();
  }
}

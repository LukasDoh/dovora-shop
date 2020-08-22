import { Component, OnInit } from '@angular/core';
import { faSave, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Article } from '../../../articles/article.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../../../../_services/article.service';
import { DataStorageService } from '../../../../_services/data-storage.service';
import { ArticleCategory } from '../../../articles/article-category.model';
import { Subscription, Observable } from 'rxjs';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  subscription: Subscription;
  categories: ArticleCategory[] = [];
  nextArticleId: number = 0;
  addForm: FormGroup;
  selectedFile: File = null;
  faSave = faSave;
  faPlus = faPlus;
  imgUrl: string;
  validFile: boolean;
  validFileTypes: string[] = ['jpg', 'gif', 'png'];

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private articleService: ArticleService,
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscription = this.articleService.categoriesChanged.subscribe(
      (categories: ArticleCategory[]) => {
        this.categories = categories;
      }
    );
    this.categories = this.articleService.getCategories();
    this.nextArticleId = this.articleService.getLastArticle().id + 1;
    this.addForm = this.formBuilder.group({
      id: [{ value: this.nextArticleId, disabled: true }],
      name: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*[.,,]?[0-9]{0,2}$')],
      ],
      category: ['', Validators.required],
      image: [''],
    });
    this.addForm.setErrors({noImage: true})
  }

  // Called when file is changed
  public onUpload(event) {
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
      this.validFile = null;
      this.addForm.setErrors(null);
      return;
    }
    const fileType = this.selectedFile.name.substring(
      this.selectedFile.name.length - 3
    );
    if (this.validFileTypes.indexOf(fileType) === -1) {
      this.validFile = false;
      this.addForm.setErrors({ incorrect: true });
      return;
    }
    this.dataStorageService
      .uploadFile(this.selectedFile, this.nextArticleId)
      .subscribe((value) => (this.imgUrl = value));
    this.validFile = true;
    this.addForm.setErrors(null);
  }

  onSaveArticle(addMultiple: Boolean) {
    const value = this.addForm.getRawValue();
    const newArticle = new Article(
      value.id,
      value.name,
      value.price,
      value.category
    );
    this.articleService.addArticle(newArticle);
    this.dataStorageService.saveNewestArticle();
    this.addForm.reset();
    if (addMultiple === false) {
      this.activeModal.close();
    }
    this.nextArticleId += 1;
    this.addForm.controls.id.setValue(this.nextArticleId);
  }

  onCloseModal() {
    this.activeModal.close();
  }
}

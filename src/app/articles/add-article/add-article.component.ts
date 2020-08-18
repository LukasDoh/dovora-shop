import { Component, OnInit } from '@angular/core';
import { faSave, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Article } from '../article.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ArticleCategory } from '../article-category.model';
import { Subscription, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

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
  faPlus = faPlusSquare;
  downloadURL: Observable<string>;
  imgUrl: string;
  validFile: boolean;
  validFileTypes: string[] = ['jpg', 'gif', 'png'];

  constructor(
    private modalService: NgbModal,
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
    console.log(this.downloadURL);
    this.addForm.reset();
    if (addMultiple === false) {
      this.modalService.dismissAll();
    }
    this.nextArticleId += 1;
  }

  onCloseModals() {
    this.modalService.dismissAll();
  }
}

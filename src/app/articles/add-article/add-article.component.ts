import { Component, OnInit } from '@angular/core';
import { faSave, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Article } from '../article.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ArticleCategory } from '../article-category.model';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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

  constructor(
    private modalService: NgbModal,
    private articleService: ArticleService,
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder,
    private router: Router
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
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: [''],
    });
  }

  // Called when file is changed
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onSaveArticle(addMultiple: Boolean) {
    const value = this.addForm.getRawValue();
    const newArticle = new Article(
      value.id,
      value.name,
      'default.jpg',
      value.price,
      value.category
    );
    this.articleService.addArticle(newArticle);
    this.dataStorageService.saveNewestArticle();
    this.addForm.reset();
    if (addMultiple === false) {
      this.modalService.dismissAll();
      this.router.navigateByUrl('/')
    }
    this.nextArticleId += 1;
  }

  onCloseModals() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('/')
  }
}

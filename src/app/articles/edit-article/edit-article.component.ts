import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable } from 'rxjs';
import { ArticleCategory } from '../article-category.model';
import { ArticleService } from '../article.service';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from '../article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {
  selectedFile: any;
  subscription: Subscription;
  categories: ArticleCategory[] = [];
  @Input() id: number;
  article: Article;
  editForm: FormGroup;
  faSave = faSave;
  faTrash = faTrash;
  imgUrl: string;
  constructor(
    private modalService: NgbModal,
    private articleService: ArticleService,
    private dataService: DataStorageService,
    private router: Router,
    private formBuilder: FormBuilder
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
      price: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.article = this.articleService.getArticle(this.id);
    this.editForm.setValue(this.article);
    this.dataService
      .getUrl(this.article.id)
      .subscribe((value) => (this.imgUrl = value));
  }

  onDeleteArticle() {
    const id = this.editForm.get('id').value;
    this.articleService.removeArticle(this.editForm.getRawValue());
    this.dataService.deleteArticle(id);
    this.dataService.deleteFile(id);
    this.modalService.dismissAll();
  }

  onUpdateArticle() {
    this.articleService.updateArticle(this.editForm.getRawValue());
    this.dataService.updateArticle(this.editForm.getRawValue());
    this.modalService.dismissAll();
  }

  // Called when file is changed
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.dataService
      .uploadFile(this.selectedFile, this.article.id)
      .subscribe((value) => (this.imgUrl = value));
  }

  onCloseModals() {
    this.modalService.dismissAll();
  }
}

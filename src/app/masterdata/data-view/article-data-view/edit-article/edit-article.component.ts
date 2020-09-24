import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ArticleCategory } from '../../../articles/article-category.model';
import { ArticleService } from '../../../../_services/article.service';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from '../../../articles/article.model';
import { DataStorageService } from 'src/app/_services/data-storage.service';

/**
 * Edit Article Component: to edit an article via modal
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {
  selectedFile: File;
  subscription: Subscription;
  categories: ArticleCategory[] = [];
  @Input() article: Article;
  editForm: FormGroup;
  faSave = faSave;
  faTrash = faTrash;
  imgUrl: string;
  validFile: boolean = true;
  validFileTypes: string[] = ['jpg', 'gif', 'png'];

  constructor(
    private articleService: ArticleService,
    private dataService: DataStorageService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  /**
   * on init: subscribe to categories list and articles list, build form, get image of article
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
      price: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*[.,,]?[0-9]{0,2}$')],
      ],
      category: ['', Validators.required],
    });
    this.editForm.setValue(this.article);
    this.dataService
      .getUrl(this.article.id)
      .subscribe((value) => (this.imgUrl = value));
  }

  /**
   * deletes an article if button is clicked
   */
  onDeleteArticle() {
    const id = this.editForm.get('id').value;
    this.articleService.removeArticle(this.editForm.getRawValue());
    this.dataService.deleteArticle(id);
    this.dataService.deleteFile(id);
    this.activeModal.close();
  }

  /**
   * saves changes if save button is clicked
   */
  onUpdateArticle() {
    this.articleService.updateArticle(this.editForm.getRawValue());
    this.dataService.updateArticle(this.editForm.getRawValue());
    this.activeModal.close();
  }

  /**
   * Determines wether an article image was changed if the file dialog was used and saves it.
   * @param event
   * @returns
   */
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
      this.validFile = true;
      this.editForm.setErrors(null);
      return;
    }
    const fileType = this.selectedFile.name.substring(
      this.selectedFile.name.length - 3
    );
    if (this.validFileTypes.indexOf(fileType) === -1) {
      this.validFile = false;
      this.editForm.setErrors({ incorrect: true });
      return;
    }
    this.dataService
      .uploadFile(this.selectedFile, this.article.id)
      .subscribe((value) => (this.imgUrl = value));
  }

  /**
   * closes active modal
   */
  onCloseModals() {
    this.activeModal.dismiss();
  }
}

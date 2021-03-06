import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../_services/article.service';
import { Subscription } from 'rxjs';
import { Article } from '../../articles/article.model';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  AngularFireStorageReference,
  AngularFireStorage,
} from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { AddArticleComponent } from './add-article/add-article.component';

/**
 * Article Data View Component: lets employees change article data.
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Component({
  selector: 'app-article-data-view',
  templateUrl: './article-data-view.component.html',
  styleUrls: ['./article-data-view.component.css'],
})
export class ArticleDataViewComponent implements OnInit {
  subscription: Subscription;
  articles: Article[] = [];
  faPen = faPen;
  faPlus = faPlus;
  imgUrl = {};

  constructor(
    private articleService: ArticleService,
    private storage: AngularFireStorage,
    private modalService: NgbModal
  ) {}

  /**
   * on init: subscribe to article list,
   */
  ngOnInit(): void {
    this.subscription = this.articleService.articlesChanged.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articles = this.articleService.getArticles();
    this.articles.forEach((article) => {
      const ref: AngularFireStorageReference = this.storage.ref(
        '/images/' + article.id
      );
      ref.getDownloadURL().subscribe((value) => {
        this.imgUrl[article.id] = value;
      });
    });
  }

  /**
   * opens modal for adding articles
   */
  onOpenAdd() {
    const modalRef = this.modalService.open(AddArticleComponent);
  }


  /**
   * opens modal for editing articles
   * @param article
   */
  onOpenEdit(article: Article) {
    const modalRef = this.modalService.open(EditArticleComponent);
    modalRef.componentInstance.article = article;
  }

  /**
   * Gets image from imgUrl list
   * @param id
   * @returns
   */
  getImage(id: number) {
    return this.imgUrl[id];
  }
}

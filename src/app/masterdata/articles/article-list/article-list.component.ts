import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Article } from '../article.model';
import { Subscription } from 'rxjs';

import { ArticleService } from '../../../_services/article.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/storage';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

/**
 * Article List Component: displays articles in grid
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  articles: Article[] = [];
  articleImage: any;
  faPen = faPen;
  imgUrl = {};
  currentUser;
  isLoggedIn: Boolean = false;

  constructor(
    private articleService: ArticleService,
    private storage: AngularFireStorage,
    private cartService: ShoppingCartService,
    private tokenService: TokenStorageService
  ) {}

  /**
   * on init: subscribe to article list, get product images, checks for loggedin user and gets it.
   */
  ngOnInit(): void {
    this.subscription = this.articleService.articlesChanged.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        this.articles.forEach((article) => {
          const ref: AngularFireStorageReference = this.storage.ref(
            '/images/' + article.id
          );
          ref.getDownloadURL().subscribe((value) => {
            this.imgUrl[article.id] = value;
          });
        });
      }
    );
    this.articles = this.articleService.getArticles();
    this.currentUser = this.tokenService.getUser();
    if (this.currentUser) {
      this.isLoggedIn = true;
    }
  }

  /**
   * Gets image for article
   * @param id
   * @returns
   */
  getImage(id: number) {
    return this.imgUrl[id];
  }

  /**
   * Adds article to shopping cart
   * @param article
   */
  onAdd(article: Article) {
    this.cartService.addToCart(article);
    console.log(this.cartService.calcTotal());
  }

  /**
   * on destroy: unsubscribes
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

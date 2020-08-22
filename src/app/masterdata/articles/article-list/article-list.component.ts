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

  getImage(id: number) {
    return this.imgUrl[id];
  }

  onAdd(article: Article) {
    this.cartService.addToCart(article);
    console.log(this.cartService.calcTotal());
  }

  ngOnDestroy() {
    console.log('unsub');
    this.subscription.unsubscribe();
  }
}

import { Injectable } from '@angular/core';
import { Article } from '../masterdata/articles/article.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  items = [];
  itemsChanged = new Subject<Article[]>();

  addToCart(article: Article) {
    this.items.push(article);
    this.itemsChanged.next(this.items.slice());
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  calcTotal() {
    let amount = 0;
    this.items.forEach((item) => {
      amount += item.price;
    });
    return +amount.toFixed(2);
  }
}

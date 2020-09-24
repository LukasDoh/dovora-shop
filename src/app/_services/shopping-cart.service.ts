import { Injectable } from '@angular/core';
import { Article } from '../masterdata/articles/article.model';
import { Subject } from 'rxjs';

/**
 * Shopping Cart Service: Interacts with shopping cart list.
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  items = [];
  itemsChanged = new Subject<Article[]>();

  /**
   * Adds to cart
   * @param article
   */
  addToCart(article: Article) {
    this.items.push(article);
    this.itemsChanged.next(this.items.slice());
  }

  /**
   * Gets items from cart
   * @returns
   */
  getItems() {
    return this.items;
  }

  /**
   * Clears cart
   * @returns
   */
  clearCart() {
    this.items = [];
    return this.items;
  }

  /**
   * Calculates total amount of cart
   * @returns
   */
  calcTotal() {
    let amount = 0;
    this.items.forEach((item) => {
      amount += item.price;
    });
    return +amount.toFixed(2);
  }
}

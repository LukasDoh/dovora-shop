import { Component, OnInit } from '@angular/core';
import { Article } from '../masterdata/articles/article.model';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

/**
 * Shopping Cart Component: Displays items in shopping cart
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Article[];
  subscription: Subscription;
  imgUrl = {};
  totalAmount: number;

  constructor(
    private cartService: ShoppingCartService,
    private storage: AngularFireStorage,
  ) {}

  /**
   * on init: suscribes to items in cart list, gets items in cart, loads image for each item, calculates total cart amount
   */
  ngOnInit(): void {
    this.subscription = this.cartService.itemsChanged.subscribe(
      (items: Article[]) => {
        this.cartItems = items;
      }
    )
    this.cartItems = this.cartService.getItems();
    this.cartItems.forEach((item) => {
      const ref: AngularFireStorageReference = this.storage.ref(
        '/images/' + item.id
      );
      ref.getDownloadURL().subscribe((value) => {
        this.imgUrl[item.id] = value;
      });
    });
    this.totalAmount = this.cartService.calcTotal();
  }

  /**
   * Determines whether cart has items in it
   * @returns
   */
  hasItems() {
    return this.cartItems.length > 0;
  }

  /**
   * Gets image of article
   * @param id
   * @returns
   */
  getImage(id: number) {
    return this.imgUrl[id];
  }
}

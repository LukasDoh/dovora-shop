import { Component, OnInit } from '@angular/core';
import { Article } from '../masterdata/articles/article.model';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { DataStorageService } from '../_services/data-storage.service';
import { Subscription } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

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
    private dataService: DataStorageService,
    private storage: AngularFireStorage,
  ) {}

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

  hasItems() {
    return this.cartItems.length > 0;
  }

  getImage(id: number) {
    return this.imgUrl[id];
  }
}

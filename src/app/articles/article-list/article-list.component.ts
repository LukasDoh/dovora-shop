import { Component, OnInit } from '@angular/core';

import { Article } from '../article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [
    new Article(
      'Jeans',
      'https://static.pullandbear.net/2/photos/2020/V/0/2/p/5682/526/406/5682526406_1_1_3.jpg?t=1584527583340',
      'test description',
      49.99
    ),
    new Article(
      'Hoodie',
      'https://cdn.shopify.com/s/files/1/0055/1242/products/IND5000P-GHR_2048x.jpg?v=1559238178',
      'test description',
      29.99
    ),
    new Article(
      'Shirt',
      'https://cdn.shopify.com/s/files/1/2143/3217/products/500_d31b0b14-cf17-4c44-8501-9f640df27ac5.png?v=1583268433',
      'test description',
      19.99
    ),
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { Article } from '../article.model';
import { NgForm } from '@angular/forms';
import { ArticleService } from '../article.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent {
  faSave = faSave;

  constructor(
    private articleService: ArticleService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  onSaveArticle(form: NgForm, addMultiple: Boolean) {
    const value = form.value;
    const newArticle = new Article(
      value.id,
      value.name,
      'default.jpg',
      value.price,
      value.category
    );
    this.articleService.addArticle(newArticle);
    this.dataStorageService.saveNewestArticle();
    form.reset();
    console.log(addMultiple);
    if (addMultiple === false) {
      this.router.navigateByUrl('/articles/close')
    }
  }
}

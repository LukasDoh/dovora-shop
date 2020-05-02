import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

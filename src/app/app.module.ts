import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Routes, RouterModule } from '@angular/router';

import { AddArticleComponent } from './articles/add-article/add-article.component';
import { ArticleModalContainer } from './articles/article-modal-container.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'articles',
    children: [
      {
        path: '',
        component: ArticlesComponent
      },
      {
        path: ':operation', // Route for adding articles
        component: ArticleModalContainer
      },
    ],
  },
  {path: '**', redirectTo: ''}
];
@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleListComponent,
    HeaderComponent,
    SidebarComponent,
    AddArticleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

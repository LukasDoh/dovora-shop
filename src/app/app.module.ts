import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire'
import { AngularFireStorageModule } from '@angular/fire/storage'


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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditArticleComponent } from './articles/edit-article/edit-article.component';

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
        component: ArticleModalContainer,
      },
      {
        path: ':operation/:id', // Route for editing articles
        component: ArticleModalContainer,
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
    EditArticleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBBen5fGKFHJgXdLQXD27MzBEjV_sx9gPI",
      authDomain: "dovora-shop.firebaseapp.com",
      storageBucket: "dovora-shop.appspot.com",
      projectId: "dovora-shop",
    }),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

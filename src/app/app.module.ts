import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire'
import { AngularFireStorageModule } from '@angular/fire/storage'


import { AppComponent } from './app.component';
import { ArticlesComponent } from './masterdata/articles/articles.component';
import { ArticleListComponent } from './masterdata/articles/article-list/article-list.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AddArticleComponent } from './masterdata/articles/add-article/add-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditArticleComponent } from './masterdata/articles/edit-article/edit-article.component';
import { AppRoutingModule } from './app-routing/app-routing.module';


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
    AppRoutingModule,
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

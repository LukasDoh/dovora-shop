import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import {
  HttpClientModule,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './masterdata/articles/articles.component';
import { ArticleListComponent } from './masterdata/articles/article-list/article-list.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AddArticleComponent } from './masterdata/data-view/article-data-view/add-article/add-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditArticleComponent } from './masterdata/data-view/article-data-view/edit-article/edit-article.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DataViewComponent } from './masterdata/data-view/data-view.component';
import { HomeComponent } from './home/home.component';
import { ArticleDataViewComponent } from './masterdata/data-view/article-data-view/article-data-view.component';
import { CustomerDataViewComponent } from './masterdata/data-view/customer-data-view/customer-data-view.component';
import { ArticleCategoryDataViewComponent } from './masterdata/data-view/article-category-data-view/article-category-data-view.component';
import { AddCategoryComponent } from './masterdata/data-view/article-category-data-view/add-category/add-category.component';
import { EditCategoryComponent } from './masterdata/data-view/article-category-data-view/edit-category/edit-category.component';
import { AddCustomerComponent } from './masterdata/data-view/customer-data-view/add-customer/add-customer.component';
import { EditCustomerComponent } from './masterdata/data-view/customer-data-view/edit-customer/edit-customer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest'),
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleListComponent,
    HeaderComponent,
    SidebarComponent,
    AddArticleComponent,
    EditArticleComponent,
    DataViewComponent,
    HomeComponent,
    ArticleDataViewComponent,
    CustomerDataViewComponent,
    ArticleCategoryDataViewComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingCartComponent,
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
      apiKey: 'AIzaSyBBen5fGKFHJgXdLQXD27MzBEjV_sx9gPI',
      authDomain: 'dovora-shop.firebaseapp.com',
      storageBucket: 'dovora-shop.appspot.com',
      projectId: 'dovora-shop',
    }),
    AngularFireStorageModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}

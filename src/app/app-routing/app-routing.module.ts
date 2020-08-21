import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataViewComponent } from '../masterdata/data-view/data-view.component';
import { HomeComponent } from '../home/home.component';
import { ArticleDataViewComponent } from '../masterdata/data-view/article-data-view/article-data-view.component';
import { ArticleCategoryDataViewComponent } from '../masterdata/data-view/article-category-data-view/article-category-data-view.component';
import { CustomerDataViewComponent } from '../masterdata/data-view/customer-data-view/customer-data-view.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'masterdata',
    component: DataViewComponent,
    children: [
      {
        path: 'articles',
        component: ArticleDataViewComponent,
      },
      {
        path: 'articlecategories',
        component: ArticleCategoryDataViewComponent,
      },
      {
        path: 'customers',
        component: CustomerDataViewComponent,
      },
      {
        path: 'orders',
        redirectTo: '',
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

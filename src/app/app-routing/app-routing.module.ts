import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from '../masterdata/articles/articles.component';
import { ArticleModalContainer } from '../masterdata/articles/article-modal-container.component';
import { DataViewComponent } from '../masterdata/data-view/data-view.component';
import { HomeComponent } from '../home/home.component';
import { ArticleDataViewComponent } from '../masterdata/data-view/article-data-view/article-data-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'articles',
    children: [
      {
        path: '',
        component: ArticlesComponent,
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
  { path: 'masterdata', component: DataViewComponent, children: [
    {
      path: 'articles',
      component: ArticleDataViewComponent
    }
  ] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

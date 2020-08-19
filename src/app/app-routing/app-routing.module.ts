import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from '../masterdata/articles/articles.component';
import { ArticleModalContainer } from '../masterdata/articles/article-modal-container.component';

const routes: Routes = [
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
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

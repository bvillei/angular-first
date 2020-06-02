import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {ArticleDetailsComponent} from './article-details/article-details.component';
import {ArticleDetailsResolve} from './article-details/article-details.resolve';

const routes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search', component: SearchComponent},
  {
    path: 'detail/:articleTitle',
    resolve: {
      something: ArticleDetailsResolve
    },
    component: ArticleDetailsComponent
  }
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }


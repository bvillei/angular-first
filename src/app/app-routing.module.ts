import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {SearchResultDetailComponent} from './search-result-detail/search-result-detail.component';

const routes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'detail/:articleTitle', component: SearchResultDetailComponent},
  {path: '', redirectTo: '/search', pathMatch: 'full'}
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


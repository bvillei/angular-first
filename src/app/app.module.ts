import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';

import {AppComponent} from './app.component';
import {SearchComponent} from './search/search.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {SearchState} from './store/search.state';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchResultDetailComponent } from './search-result-detail/search-result-detail.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchInputComponent,
    SearchResultsComponent,
    SearchResultDetailComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([SearchState], {developmentMode: !environment.production}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

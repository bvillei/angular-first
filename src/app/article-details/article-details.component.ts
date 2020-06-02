import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Actions, ofActionDispatched, ofActionErrored, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {SearchState} from '../store/search.state';
import {Observable, Subscription} from 'rxjs';
import {Article} from '../models/article';
import {GetArticle} from '../store/search.actions';
import {delay} from 'rxjs/operators';
import {ActionContext} from '@ngxs/store/src/actions-stream';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  constructor(public store: Store) { }

  @Select(SearchState.getDetailArticle) article$: Observable<Article>;
  @Select(SearchState.getDetailLoading) loading$: Observable<boolean>;
  @Select(SearchState.getDetailErrorMessage) errorMessage$: Observable<string>;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}

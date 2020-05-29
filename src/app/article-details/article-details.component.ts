import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {SearchState} from '../store/search.state';
import {Observable, Subscription} from 'rxjs';
import {Article} from '../models/article';
import {GetArticle} from '../store/search.actions';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  articleTitle: string;

  constructor(public route: ActivatedRoute,
              public store: Store) { }

  @Select(SearchState.getDetailArticle) article$: Observable<Article>;

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.articleTitle = params.articleTitle;
      console.log(this.articleTitle);
      this.store.dispatch(new GetArticle(this.articleTitle));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

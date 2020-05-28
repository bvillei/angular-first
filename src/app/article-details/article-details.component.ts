import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {SearchState} from '../store/search.state';
import {Observable} from 'rxjs';
import {Article} from '../models/article';
import {GetArticle} from '../store/search.actions';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  articleTitle: string;

  constructor(public route: ActivatedRoute,
              public store: Store) { }

  @Select(SearchState.getFirstArticle) article$: Observable<Article>;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleTitle = params.articleTitle;
      console.log(this.articleTitle);
    });
    this.store.dispatch(new GetArticle(this.articleTitle));
  }

}

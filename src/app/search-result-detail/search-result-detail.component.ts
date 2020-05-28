import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../services/article.service';
import {GetArticle, Search} from '../store/search.actions';
import {Select, Store} from '@ngxs/store';
import {SearchState} from '../store/search.state';
import {Observable} from 'rxjs';
import {Article} from '../models/article';

@Component({
  selector: 'app-search-result-detail',
  templateUrl: './search-result-detail.component.html',
  styleUrls: ['./search-result-detail.component.css']
})
export class SearchResultDetailComponent implements OnInit {

  articleTitle: string;

  constructor(public route: ActivatedRoute,
              public articleService: ArticleService,
              public store: Store) { }

  @Select(SearchState.getFirstArticle) article$: Observable<Article>;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleTitle = params['articleTitle'];
      console.log(this.articleTitle);
    });
    this.store.dispatch(new GetArticle(this.articleTitle));
  }

}

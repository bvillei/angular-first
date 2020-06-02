import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Article} from '../models/article';
import {Select, Store} from '@ngxs/store';
import {SearchState} from '../store/search.state';
import {GetArticle, ResetArticle, Search} from '../store/search.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public store: Store, private router: Router) {
  }

  @Select(SearchState.getSearchTerm) searchTerm$: Observable<string>;
  @Select(SearchState.getSearchResults) searchResults$: Observable<Article[]>;
  @Select(SearchState.getLoading) loading$: Observable<boolean>;
  @Select(SearchState.getErrorMessage) errorMessage$: Observable<string>;
  @Select(SearchState.getDetailArticle) detail$: Observable<Article>;

  public searchTerm = new Subject<KeyboardEvent>();

  public search() {
    this.searchTerm.pipe(
      map((e: any) => {
        console.log(e.target.value);
        return e.target.value;
      }),
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.store.dispatch(new Search(value));
    });
  }

  ngOnInit(): void {
    this.search();
  }

  public newSearch(newSearchTerm: any){
    this.searchTerm.next(newSearchTerm);
  }

  handleArticleClicked(article: Article) {
    this.router.navigate([ 'detail', article.title ]);
  }

  resetDetail() {
    this.store.dispatch(new ResetArticle());
  }
}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Article} from '../models/article';
import {Select, Store} from '@ngxs/store';
import {SearchState} from '../store/search.state';
import {Search} from '../store/search.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl('', Validators.required)
  });

  constructor(public store: Store) {
  }

  @Select(SearchState.getSearchTerm) searchTerm$: Observable<string>;
  @Select(SearchState.getSearchResults) searchResults$: Observable<Article[]>;
  @Select(SearchState.getLoading) loading$: Observable<boolean>;
  @Select(SearchState.getErrorMessage) errorMessage$: Observable<string>;

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

}

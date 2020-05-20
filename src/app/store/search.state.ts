import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {SearchService} from '../services/search.service';
import {Article} from '../models/article';
import {Search, SearchComplete, SearchError} from './search.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {FormGroup, Validators} from '@angular/forms';

export interface SearchStateModel {
  loading: boolean;
  searchTerm: string;
  searchResults: Article[];
  errorMessage: string;
}

export const searchStateDefaults: SearchStateModel = {
  loading: false,
  searchTerm: '',
  searchResults: [],
  errorMessage: '',
};

@State<SearchStateModel>({
  name: 'search',
  defaults: searchStateDefaults
})
@Injectable()
export class SearchState {
  constructor(private readonly searchService: SearchService) {
  }

  @Selector([SearchState])
  static getSearchResults(state: SearchStateModel) {
    return state.searchResults;
  }

  @Selector([SearchState])
  static getSearchTerm(state: SearchStateModel) {
    return state.searchTerm;
  }

  @Selector([SearchState])
  static getLoading(state: SearchStateModel) {
    return state.loading;
  }

  @Selector([SearchState])
  static getErrorMessage(state: SearchStateModel) {
    return state.errorMessage;
  }

  @Action(Search, {cancelUncompleted: true})
  search(
    {dispatch, patchState}: StateContext<SearchStateModel>,
    action: Search
  ) {
    const searchTerm = action.payload;

    if (searchTerm === '') {
      patchState({
        loading: false,
        searchTerm,
        searchResults: [],
        errorMessage: '',
      });
      return;
    }

    patchState({
      loading: true,
      errorMessage: '',
      searchTerm,
    });

    return this.searchService.searchEntries(action.payload).pipe(
      map((articles: Article[]) => dispatch(new SearchComplete(articles))),
      catchError(err => {
        dispatch(new SearchError(err.error.error.message));
        return of(new SearchError(err));
      })
    );
  }

  @Action(SearchComplete)
  searchComplete(
    {patchState}: StateContext<SearchStateModel>,
    action: SearchComplete
  ) {
    patchState({
      searchResults: action.payload,
      loading: false,
      errorMessage: '',
    });
  }

  @Action(SearchError)
  searchError(
    {patchState}: StateContext<SearchStateModel>,
    action: SearchError
  ) {
    patchState({
      loading: false,
      errorMessage: action.payload,
    });
  }
}


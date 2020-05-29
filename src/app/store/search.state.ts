import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {SearchService} from '../services/search.service';
import {Article} from '../models/article';
import {GetArticle, GetArticleComplete, Search, SearchComplete, SearchError} from './search.actions';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

export interface SearchStateModel {
  loading: boolean;
  searchTerm: string;
  searchResults: Article[];
  errorMessage: string;
  detailArticle: Article;
}

export const searchStateDefaults: SearchStateModel = {
  loading: false,
  searchTerm: '',
  searchResults: [],
  errorMessage: '',
  detailArticle: null
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

  // @Selector([SearchState])
  // static getFirstArticle(state: SearchStateModel) {
  //   // check elements, return null..
  //   // Array.isArray();
  //   return state.searchResults[0];
  // }

  @Selector([SearchState])
  static getDetailArticle(state: SearchStateModel) {
    return state.detailArticle;
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

  @Action(GetArticle)
  getArticle(
    {dispatch, patchState}: StateContext<SearchStateModel>,
    action: GetArticle
  ) {
    return this.searchService.getArticle(action.payload).pipe(
      map((article: Article) => dispatch(new GetArticleComplete(article))),
      catchError(err => {
        dispatch(new SearchError(err.error.error.message));
        return of(new SearchError(err));
      })
    );
  }

  @Action(GetArticleComplete)
  getArticleComplete(
    {patchState}: StateContext<SearchStateModel>,
    action: GetArticleComplete
  ) {
    patchState({
      detailArticle: action.payload,
      loading: false,
      errorMessage: '',
    });
  }
}


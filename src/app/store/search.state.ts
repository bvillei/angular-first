import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {SearchService} from '../services/search.service';
import {Article} from '../models/article';
import {GetArticle, GetArticleComplete, ResetArticle, Search, SearchComplete, SearchError} from './search.actions';
import {catchError, delay, map, tap} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {patch} from '@ngxs/store/operators';

export interface SearchStateModel {
  loading: boolean;
  searchTerm: string;
  searchResults: Article[];
  errorMessage: string;
  detailArticle: Article;
  detailLoading: boolean;
  detailErrorMessage: string;
}

export const searchStateDefaults: SearchStateModel = {
  loading: false,
  searchTerm: '',
  searchResults: [],
  errorMessage: '',
  detailArticle: null,
  detailLoading: false,
  detailErrorMessage: ''
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

  @Selector([SearchState])
  static getDetailLoading(state: SearchStateModel) {
    return state.detailLoading;
  }

  @Selector([SearchState])
  static getDetailErrorMessage(state: SearchStateModel) {
    return state.detailErrorMessage;
  }

  @Action(Search, {cancelUncompleted: true})
  search(
    {dispatch, patchState}: StateContext<SearchStateModel>,
    action: Search,
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
    action: SearchComplete,
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
    action: SearchError,
  ) {
    patchState({
      loading: false,
      errorMessage: action.payload,
    });
  }

  @Action(GetArticle, {cancelUncompleted: true})
  getArticle(
    {dispatch, patchState}: StateContext<SearchStateModel>,
    action: GetArticle,
  ) {
    patchState({
      detailLoading: true,
      detailErrorMessage: '',
      detailArticle: null // optional
    });
    return this.searchService.getArticle(action.payload).pipe(
      tap((article: Article) => {
        patchState({
          detailArticle: article,
          detailErrorMessage: '',
          detailLoading: false
        });
      }),
      catchError(err => {
        let errorMessage = 'An unknown exception occurred :(';
        try {
          errorMessage = err.error.message;
        } catch (ex) {}

        action.lastError = errorMessage;
        patchState({
          detailLoading: false,
          detailErrorMessage: errorMessage
        });
        return throwError(errorMessage);
      })
    );
  }


  @Action(ResetArticle)
  resetArticle(
    {patchState}: StateContext<SearchStateModel>
  ) {
    patchState({
      detailLoading: false,
      detailErrorMessage: '',
      detailArticle: null
    });
  }
}


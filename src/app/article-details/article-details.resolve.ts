import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {GetArticle} from '../store/search.actions';
import {Article} from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleDetailsResolve implements Resolve<Article> {
  constructor(private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> | Promise<Article> | Article {
    return this.store.dispatch(new GetArticle(route.paramMap.get('articleTitle')));
  }
}

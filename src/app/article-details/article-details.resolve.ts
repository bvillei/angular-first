import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, timer} from 'rxjs';
import {Store} from '@ngxs/store';
import {GetArticle} from '../store/search.actions';

@Injectable({
  providedIn: 'root'
})
export class ArticleDetailsResolve implements Resolve<any> {
  constructor(private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.store.dispatch(new GetArticle(route.paramMap.get('articleTitle')));
  }
}

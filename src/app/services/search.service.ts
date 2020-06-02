import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {first, map} from 'rxjs/operators';
import {Article} from '../models/article';
import {environment} from '../../environments/environment';
import {ApiResponse} from '../models/api-response';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly httpClient: HttpClient) {
  }

  baseUrl = `/api/everything?apiKey=${environment.API_KEY}`;
  articles: Article[];
  detailArticle: Article;

  public searchEntries(term: string): Observable<Article[]> {
    const params = new HttpParams().set('q', term);
    return this.httpClient.get<ApiResponse>(this.baseUrl, {params}).pipe(
      map(response => {
        console.log(response);
        return this.articles = response.articles;
      })
    );
  }

  public getArticle(articleTitle: string): Observable<Article> {
    const params = new HttpParams().set('qInTitle', articleTitle);
    return this.httpClient.get<ApiResponse>(this.baseUrl, {params}).pipe(
      map(response => {
        if (response.articles.length === 0) {
          throw new Error('This article not exists');
        }
        console.log(response.articles[0]);
        return this.detailArticle = response.articles[0];
      })
    );
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Article} from '../models/article';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly httpClient: HttpClient) {
  }

  baseUrl = `/api/everything?apiKey=${environment.API_KEY}`;
  articles: Article[];

  // makes HTTP call to the api
  public searchEntries(term) {
    const params = new HttpParams().set('q', term);
    return this.httpClient.get<any>(this.baseUrl, {params}).pipe(
      map(response => {
        console.log(response);
        return this.articles = response.articles;
      })
    );
  }
}

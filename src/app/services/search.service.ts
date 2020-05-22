import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Article} from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly httpClient: HttpClient) {
  }

  API_KEY = 'a9a12ccd4ba7404e95f3cf75055f7a71';
  baseUrl = `https://newsapi.org/v2/everything?apiKey=${this.API_KEY}`;
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

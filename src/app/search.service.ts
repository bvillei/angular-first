import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  API_KEY = 'e1dc0f2120e848189bf7d2db280eeea4';
  baseUrl = `https://newsapi.org/v2/everything?apiKey=${this.API_KEY}`;
  public searchResults: any;

  // makes HTTP call to the api
  public searchEntries(term) {
    if (term === '') {
      console.log('Not defined');
      return of(null);
    }
    else {
      const params = new HttpParams().set('q', term);
      return this.httpClient.get<any>(this.baseUrl, {params}).pipe(
        map(response => {
          console.log(response);
          return this.searchResults = response.articles;
        })
      );
    }
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  public baseUrl = 'https://api.github.com/search/repositories';
  public searchResults: any;

  // makes HTTP call to the api
  public searchEntries(term) {
    if (term === '') {
      console.log('Not defined');
      return of(null);
    }
    else {
      const params = {q: term};
      return this.httpClient.get(this.baseUrl, {params}).pipe(
        map(response => {
          console.log(response);
          return this.searchResults = response["items"];
        })
      );
    }
  }

  // returns the response
  public _searchEntries(term) {
    return this.searchEntries(term);
  }
}

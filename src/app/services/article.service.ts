import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Article} from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private readonly httpClient: HttpClient) { }

  baseUrl = `/api/everything?apiKey=${environment.API_KEY}`;
  article: Article[];

  public getArticle(articleTitle: string) {
    const params = new HttpParams().set('qInTitle', articleTitle);
    console.log(params);
    return this.httpClient.get<any>(this.baseUrl, {params}).pipe(
      map(response => {
        console.log(response);
        return this.article = response.articles;
      })
    );
  }
}

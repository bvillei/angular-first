import { Component, OnInit } from '@angular/core';
import {ARTICLES} from './mock-article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles = ARTICLES;

  constructor() { }

  ngOnInit(): void {
  }

}

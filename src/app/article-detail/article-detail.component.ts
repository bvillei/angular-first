import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../models/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  constructor() { }

  @Input() article: Article;

  ngOnInit(): void {
  }

}

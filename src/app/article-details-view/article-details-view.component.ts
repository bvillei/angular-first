import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../models/article';

@Component({
  selector: 'app-article-details-view',
  templateUrl: './article-details-view.component.html',
  styleUrls: ['./article-details-view.component.css']
})
export class ArticleDetailsViewComponent implements OnInit {

  constructor() { }

  @Input() article: Article;

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../models/article';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-search-result-detail',
  templateUrl: './search-result-detail.component.html',
  styleUrls: ['./search-result-detail.component.css']
})
export class SearchResultDetailComponent implements OnInit {

  articleTitle: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articleTitle = params['articleTitle'];
    });
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from '../models/article';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor() { }

  @Input() searchResults: Article[];

  @Output() articleClicked = new EventEmitter<Article>();

  ngOnInit(): void {
  }

}

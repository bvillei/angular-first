import { Component, OnInit } from '@angular/core';
import {SearchService} from '../search.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, throwError} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {Article} from '../article';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public loading: boolean;
  public searchTerm = new Subject<string>();
  public searchResults: Article[];
  public errorMessage: any;
  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required)
  });

  constructor(private searchService: SearchService) { }

  public search() {
    this.searchTerm.pipe(
      map( (e: any) => {
        console.log(e.target.value);
        return e.target.value;
      }),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;
        return this.searchService.searchEntries(term);
      }),
      catchError(err => {
        console.log(err);
        this.loading = false;
        this.errorMessage = err.message;
        return throwError(err);
      }),
    ).subscribe(value => {
      this.loading = false;
      this.searchResults = value;
    });
  }

  ngOnInit(): void {
    this.search();
  }

}

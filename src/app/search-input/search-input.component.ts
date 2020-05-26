import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl('', Validators.required)
  });

  @Input() searchTerm: string;
  @Output() searchEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  inputChanged(event: KeyboardEvent) {
    this.searchEvent.emit(event);
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() searchModel;

  @Output() searchModelChange: EventEmitter<any> = new EventEmitter();

  product: Product;

  constructor() { }

  ngOnInit() {
  }

  updateSearchModel(value) {
    this.searchModel = value;
    this.searchModelChange.emit(this.searchModel);
  }

}
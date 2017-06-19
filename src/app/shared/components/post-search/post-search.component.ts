import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'hb-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss']
})
export class PostSearchComponent implements OnInit {

  @Input() search = '';
  @Output() searchChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

}

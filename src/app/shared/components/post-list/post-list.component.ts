import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'app/shared/models/post';

@Component({
  selector: 'hb-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input()
  posts: Post[];

  @Output()
  openDetail = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {

  }

}

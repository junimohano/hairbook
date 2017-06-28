import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Post } from 'app/shared/models/post';

@Component({
  selector: 'hb-post-list-all',
  templateUrl: './post-list-all.component.html',
  styleUrls: ['./post-list-all.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class PostListAllComponent implements OnInit {

  @Input()
  posts: Post[];

  constructor() { }

  ngOnInit() {
  }

}

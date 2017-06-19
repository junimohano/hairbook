import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { Post } from 'app/shared/models/post';
import { PostHairMenu } from 'app/shared/models/post-hair-menu';

@Component({
  selector: 'hb-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  @Input() post: Post;
  @Input() postMenuColor: PostHairMenu;
  @Input() postMenuParm: PostHairMenu;

  @Output() previous = new EventEmitter<number>();
  @Output() next = new EventEmitter<number>();

  constructor( @Inject(MD_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

}

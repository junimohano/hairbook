import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'hb-post-menu',
  templateUrl: './post-menu.component.html',
  styleUrls: ['./post-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PostMenuComponent implements OnInit {

  @Output() editPost = new EventEmitter();
  @Output() deletePost = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickEdit() {
    this.editPost.emit();
  }

  onClickDelete() {
    this.deletePost.emit();
  }

}

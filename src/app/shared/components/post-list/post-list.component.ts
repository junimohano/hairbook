import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdDialog } from '@angular/material';
import { PostDetailComponent } from 'app/shared/components/post-detail/post-detail.component';
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
  goDetail = new EventEmitter<Post>();

  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {

  }

  onOpenDetail(post: Post) {
    // if (window.outerWidth > 600) {
    if (1 === 1) {
      const height = window.outerHeight > 768 ? 768 : window.outerHeight;
      const width = window.outerWidth > 1024 ? 1024 : window.outerWidth;

      const dialogRef = this.dialog.open(PostDetailComponent, {
        height: `${height}px`,
        width: `${width}px`,
        data: post
      });

      // dialogRef.updateSize(width + 'px', height + 'px');
      // dialogRef.updatePosition({ top: '50px', left: '50px' });

      // this.previousSubscription = dialogRef.componentInstance.previous.subscribe((postId: number) => {
      // });

      // this.nextSubscription = dialogRef.componentInstance.next.subscribe((postId: number) => {
      // });

      // dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
      // })

      dialogRef.componentInstance.closeDialog.subscribe(() => dialogRef.close());

    } else {
      this.goDetail.emit(post);
    }
  }

}

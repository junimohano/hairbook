import { Component, OnInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Auth } from '../../shared/auth/auth.service';

import { Store } from '@ngrx/store';
import * as UserActions from '../shared/user-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { Post } from 'app/shared/models/post';
import { PostDetailComponent } from 'app/shared/components/post-detail/post-detail.component';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';

@Component({
  selector: 'hb-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMainComponent implements OnInit {

  search$: Observable<string>;
  posts$: Observable<Post[]>;
  isProgressSpinner$: Observable<boolean>;

  constructor(private auth: Auth, private store: Store<Reducers.State>, public dialog: MdDialog) {
    this.search$ = store.select(Reducers.userSearch);
    this.posts$ = store.select(Reducers.userPosts);
    this.isProgressSpinner$ = store.select(Reducers.sharedIsProgressSpinner);
  }

  ngOnInit() {
    this.store.dispatch(new UserActions.SearchPost());
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      console.log('bottom');
      this.store.dispatch(new UserActions.SearchPost());
    }
  }

  searchChange(search: string) {
    this.store.dispatch(new UserActions.SearchPost(search));
  }

  openDetail(post: Post) {

    //   // this.router.navigate(['/users', 'post', post.postId]);

    const height = window.outerHeight > 600 ? 600 : window.outerHeight;
    const width = window.outerHeight > 935 ? 935 : window.outerHeight;

    const dialogRef = this.dialog.open(PostDetailComponent, {
      height: `${height}px`,
      width: `${width}px`,
      data: post.postId
    });


    // dialogRef.updateSize(width + 'px', height + 'px');
    // dialogRef.updatePosition({ top: '50px', left: '50px' });


    dialogRef.componentInstance.post = post;
    dialogRef.componentInstance.postMenuColor = post.postHairMenus.find(x => x.hairMenuId === 2);
    dialogRef.componentInstance.postMenuParm = post.postHairMenus.find(x => x.hairMenuId === 3);

    dialogRef.componentInstance.previous.subscribe((postId: number) => {
      this.store.dispatch(new UserActions.PreviousUploadIndex(postId));
    });

    dialogRef.componentInstance.next.subscribe((postId: number) => {
      this.store.dispatch(new UserActions.NextUploadIndex(postId));
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
    });
  }

  test() {
    this.store.dispatch(back());
  }
}

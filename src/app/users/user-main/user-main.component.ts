import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Auth } from '../../shared/auth/auth.service';

import { Store } from '@ngrx/store';
import * as UserActions from '../shared/user-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { Post } from 'app/shared/models/post';
import { PostDetailComponent } from 'app/shared/components/post-detail/post-detail.component';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/shared/models/user';
import { Subscription } from 'rxjs/Subscription';
import { PostSearchInfo } from 'app/shared/models/post-search-info';

@Component({
  selector: 'hb-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit, OnDestroy {

  postSearchInfo$: Observable<PostSearchInfo>;
  posts$: Observable<Post[]>;
  isProgressSpinner$: Observable<boolean>;
  user$: Observable<User>;
  isMe = false;
  activatedRouteSubscription: Subscription;
  userSubscription: Subscription;
  previousSubscription: Subscription;
  nextSubscription: Subscription;

  postSearchInfo: PostSearchInfo;

  constructor(private auth: Auth, private store: Store<Reducers.State>, public dialog: MdDialog, private activatedRoute: ActivatedRoute) {
    this.postSearchInfo$ = store.select(Reducers.userPostSearchInfo);
    this.posts$ = store.select(Reducers.userPosts);
    this.isProgressSpinner$ = store.select(Reducers.sharedIsProgressSpinner);
    this.user$ = store.select(Reducers.userUser);
  }

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(params => {
      const userNameParam = params['userName'];
      this.store.dispatch(new UserActions.GetUser(userNameParam));
      this.postSearchInfo = <PostSearchInfo>{
        search: '',
        userNameParam: userNameParam
      }
      this.store.dispatch(new UserActions.SearchPost(this.postSearchInfo));
      // this.id = +params['id']; // (+) converts string 'id' to a number
    });

    this.userSubscription = this.user$.subscribe(user => {
      if (user) {
        this.isMe = user.userName === sessionStorage.getItem('userName');
      }
    });

  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    if (this.previousSubscription) {
      this.previousSubscription.unsubscribe();
    }
    if (this.nextSubscription) {
      this.nextSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      console.log('bottom');
      if (this.postSearchInfo) {
        this.postSearchInfo.search = '';
        this.store.dispatch(new UserActions.SearchPost(this.postSearchInfo));
      }
    }
  }

  searchChange(search: string) {
    if (this.postSearchInfo) {
      this.postSearchInfo.search = search;
      this.store.dispatch(new UserActions.SearchPost(this.postSearchInfo));
    }
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

    this.previousSubscription = dialogRef.componentInstance.previous.subscribe((postId: number) => {
      this.store.dispatch(new UserActions.PreviousUploadIndex(postId));
    });

    this.nextSubscription = dialogRef.componentInstance.next.subscribe((postId: number) => {
      this.store.dispatch(new UserActions.NextUploadIndex(postId));
    });

    // dialogRef.afterClosed().subscribe(result => {
    // this.selectedOption = result;
    // })
  }

}

import { UserFriend } from './models/user-friend';
import { PostFavorite } from './models/post-favorite';
import { PostSearchType } from './models/enums/post-search-type';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { AccessType } from 'app/shared/models/enums/access-type';
import { Post } from 'app/shared/models/post';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedService {

  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp) {
  }

  getPosts(userId: number, index: number, postSearchType: PostSearchType, userName: string, userNameParam: string, search: string): Observable<Post[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts?userId=${userId}&index=${index}&userName=${userName}&userNameParam=${userNameParam}&postSearchType=${postSearchType}&search=${search}`)
      .map(res => res.json());
    // .map((results: Post[]) => {
    //   results.forEach((p: Post) => {
    //     p.postUploads.forEach(u => {
    //       u.path = `${environment.webApiUrl}/${u.path.split('\\').join('/')}`;
    //     });
    //     if (p.createdUser.image && !p.createdUser.image.startsWith('http')) {
    //       p.createdUser.image = `${environment.webApiUrl}/${p.createdUser.image.split('\\').join('/')}`;
    //     }
    //   });
    //   return results;
    // });
  }

  getPost(postId: number, userId: number): Observable<Post> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts/${postId}?userId=${userId}`)
      .map(res => res.json());
  }

  delPost(postId: number): Observable<Post> {
    return this.authHttp.delete(`${environment.webApiUrl}/api/v1/posts/${postId}`)
      .map(res => res.json());
  }

  addPostComment(postComment: PostComment): Observable<PostComment> {
    return this.authHttp.post(`${environment.webApiUrl}/api/v1/PostComments/`, postComment, { headers: this.headers })
      .map(res => res.json());
  }

  delPostComment(postCommentId: number): Observable<PostComment> {
    return this.authHttp.delete(`${environment.webApiUrl}/api/v1/PostComments/${postCommentId}`)
      .map(res => res.json());
  }

  addPostEvaluation(postEvaluation: PostEvaluation): Observable<PostEvaluation> {
    return this.authHttp.post(`${environment.webApiUrl}/api/v1/PostEvaluations/`, postEvaluation, { headers: this.headers })
      .map(res => res.json());
  }

  delPostEvaluation(postId: number, userId: number): Observable<PostEvaluation> {
    return this.authHttp.delete(`${environment.webApiUrl}/api/v1/PostEvaluations?postId=${postId}&userId=${userId}`)
      .map(res => res.json());
  }

  getPostComments(index: number, postId: number): Observable<PostComment[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/PostComments?index=${index}&postId=${postId}`)
      .map(res => res.json());
  }

  getPostFavorites(index: number, userId: number): Observable<PostFavorite[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/postFavorites?index=${index}&userId=${userId}`)
      .map(res => res.json());
  }

  addPostFavorite(postFavorite: PostFavorite): Observable<PostFavorite> {
    return this.authHttp.post(`${environment.webApiUrl}/api/v1/PostFavorites/`, postFavorite, { headers: this.headers })
      .map(res => res.json());
  }

  delPostFavorite(postId: number, userId: number): Observable<PostFavorite> {
    return this.authHttp.delete(`${environment.webApiUrl}/api/v1/PostFavorites?postId=${postId}&userId=${userId}`)
      .map(res => res.json());
  }

  addUserFriend(userFriend: UserFriend): Observable<UserFriend> {
    return this.authHttp.post(`${environment.webApiUrl}/api/v1/UserFriends/`, userFriend, { headers: this.headers })
      .map(res => res.json());
  }

  delUserFriend(userId: number, friendId: number): Observable<UserFriend> {
    return this.authHttp.delete(`${environment.webApiUrl}/api/v1/UserFriends?userId=${userId}&friendId=${friendId}`)
      .map(res => res.json());
  }

}

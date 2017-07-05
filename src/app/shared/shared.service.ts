import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { environment } from 'environments/environment';
import { PostComment } from 'app/shared/models/post-comment';
import { Post } from 'app/shared/models/post';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { AccessType } from 'app/shared/models/enums/access-type';

@Injectable()
export class SharedService {

  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp) {
  }

  getPosts(index: number, accessType: AccessType, userName: string, userNameParam: string, search: string): Observable<Post[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts?index=${index}&userName=${userName}&userNameParam=${userNameParam}&accessType=${accessType}&search=${search}`)
      .map(res => res.json())
      .map((results: Post[]) => {
        results.forEach((p: Post) => {
          p.postUploads.forEach(u => {
            u.path = `${environment.webApiUrl}/${u.path.split('\\').join('/')}`;
          });
        });
        return results;
      });
  }

  getPost(postId: number): Observable<Post> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts/${postId}`)
      .map(res => res.json())
      .map((post: Post) => {
        post.postUploads.forEach(u => {
          u.path = `${environment.webApiUrl}/${u.path.split('\\').join('/')}`;
        });
        return post;
      });
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

  delPostEvaluation(postEvaluationId: number): Observable<PostEvaluation> {
    return this.authHttp.delete(`${environment.webApiUrl}/api/v1/PostEvaluations/${postEvaluationId}`)
      .map(res => res.json());
  }

  getPostComments(index: number, postId: number): Observable<PostComment[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/PostComments?index=${index}&postId=${postId}`)
      .map(res => res.json());
  }

}

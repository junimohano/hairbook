import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Customer } from 'app/shared/models/customer';
import { HairMenu } from 'app/shared/models/hair-menu';
import { HairType } from 'app/shared/models/hair-type';
import { Post } from 'app/shared/models/post';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

import { PostUploadInfo } from './post-upload-info';

@Injectable()
export class PostService {

  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp) {
  }

  getHairMenus(): Observable<HairMenu[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts/HairMenus`)
      .map(res => res.json());
  }

  getHairTypes(): Observable<HairType[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts/HairTypes`)
      .map(res => res.json());
  }

  addPost(post: Post): Observable<Post> {
    return this.authHttp.post(`${environment.webApiUrl}/api/v1/posts`, post, { headers: this.headers })
      .map(res => res.json());
  }

  editPost(post: Post): Observable<Post> {
    return this.authHttp.put(`${environment.webApiUrl}/api/v1/posts/${post.postId}`, post, { headers: this.headers })
      .map(res => res.json());
  }

  getCustomers(userId: number): Observable<Customer[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts/Customers/${userId}`)
      .map(res => res.json());
  }

  addUpload(postId: number, postUploadInfo: PostUploadInfo, userId: number) {
    const input = new FormData();
    input.append('uploadedFile', postUploadInfo.postUploadFile);
    input.append('memo', postUploadInfo.memo);
    input.append('uploadCategoryType', String(postUploadInfo.uploadCategoryType));
    input.append('uploadFileType', String(postUploadInfo.uploadFileType));
    input.append('uploadFileRotation', String(postUploadInfo.uploadFileRotation));
    input.append('userId', String(userId));
    return this.authHttp.post(`${environment.webApiUrl}/api/v1/PostUploads/${postId}`, input)
      .map(res => res.json());
  }

  delUpload(postUploadId: number) {
    return this.authHttp.delete(`${environment.webApiUrl}/api/v1/PostUploads/${postUploadId}`)
      .map(res => res.json());
  }

  updateUpload(postUploadId: number, postUploadInfo: PostUploadInfo, userId: number) {
    const input = new FormData();
    input.append('memo', postUploadInfo.memo);
    input.append('uploadCategoryType', String(postUploadInfo.uploadCategoryType));
    input.append('userId', String(userId));
    return this.authHttp.put(`${environment.webApiUrl}/api/v1/PostUploads/${postUploadId}`, input)
      .map(res => res.json());
  }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  getPosts() {
    return this.http.get(`${environment.webApiUrl}/api/v1/posts`)
      .map(res => res.json());
  }

}

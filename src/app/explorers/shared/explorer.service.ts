import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Post } from 'app/shared/models/post';
import { AccessType } from 'app/shared/models/enums/access-type';
import { Observable } from 'rxjs/Observable';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';

@Injectable()
export class ExplorerService {

  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp) { }

}

import { Component, OnInit } from '@angular/core';
import { Auth } from '../../shared/auth/auth.service';
import { myConfig } from '../../shared/auth/auth.config';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'hb-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  address: string;
  memo: string;
  constructor(public auth: Auth, private authHttp: AuthHttp, private router: Router) {
    if (auth.userProfile.user_metadata) {
      this.address = auth.userProfile.user_metadata.address;
      this.memo = auth.userProfile.user_metadata.memo;
    }
  }

  ngOnInit() {

  }
  onBack() {
    this.router.navigate(['/users']);
  }
  onSubmit() {
    const headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const data: any = JSON.stringify({
      user_metadata: {
        address: this.address,
        memo: this.memo
      }
    });

    this.authHttp
      .patch('https://' + myConfig.domain + '/api/v2/users/' + this.auth.userProfile.user_id, data, { headers: headers })
      .map(response => response.json())
      .subscribe(
      response => {
        this.auth.userProfile = response;
        localStorage.setItem('profile', JSON.stringify(response));
        this.router.navigate(['/users']);
      },
      error => alert(error.json().message)
      );
  }
}

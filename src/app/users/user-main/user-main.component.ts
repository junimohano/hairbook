import { Component, OnInit } from '@angular/core';
import { Auth } from '../../shared/auth/auth.service';

@Component({
  selector: 'hb-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMainComponent implements OnInit {


  constructor(private auth: Auth) {
  }

  ngOnInit() {
    // const userKey = this.auth.userProfile.identities[0].user_id;
    // console.log('userKey : ', userKey);

    // console.log(this.auth.userProfile['value']['identities']['user_id']);

    // console.log(localStorage.getItem('profile')['identities']);

    // this.store.dispatch(new SharedActions.GetUser(userKey));

    // this.store.select(Reducers.selectUser).subscribe(x => {
    //   console.log('result : ', x);
    // });

  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Auth } from '../../shared/auth/auth.service';

@Component({
  selector: 'hb-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMainComponent implements OnInit {


  constructor(private auth: Auth) {
  }

  ngOnInit() {
  }
}

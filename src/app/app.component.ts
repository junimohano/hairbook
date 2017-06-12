import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Auth } from './shared/auth/auth.service';

@Component({
  selector: 'hb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: Auth) {

  }
}

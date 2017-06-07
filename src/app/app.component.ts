import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  param = { value: 'world' };

  constructor(private translate: TranslateService) {

  }

  setLanguage(lang) {
    this.translate.use(lang);
  }
}

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginsRoutingModule } from './logins-routing.module';

import { LoginsComponent } from './logins.component';

@NgModule({
  imports: [
    SharedModule,
    LoginsRoutingModule
  ],
  declarations: [
    LoginsComponent
  ]
})
export class LoginsModule { }

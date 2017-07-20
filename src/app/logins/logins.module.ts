import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginsRoutingModule } from './logins-routing.module';

import { LoginService } from 'app/logins/shared/login.service';

import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './shared/login-effects';

import { LoginsComponent } from './logins.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    SharedModule,
    LoginsRoutingModule,
    EffectsModule.forFeature([LoginEffects])
  ],
  declarations: [
    LoginsComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginsModule { }

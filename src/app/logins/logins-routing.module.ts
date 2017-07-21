import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'app/logins/login/login.component';
import { RegisterComponent } from 'app/logins/register/register.component';

import { LoginsComponent } from './logins.component';

const routes: Routes = [
  {
    path: '', component: LoginsComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginsRoutingModule { }

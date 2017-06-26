import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginsComponent } from './logins.component';
import { LoginComponent } from 'app/logins/login/login.component';
import { RegisterComponent } from 'app/logins/register/register.component';

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

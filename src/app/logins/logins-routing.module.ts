import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginsComponent } from './logins.component';
import { LoginComponent } from 'app/logins/login/login.component';
import { CreateComponent } from 'app/logins/create/create.component';

const routes: Routes = [
  {
    path: '', component: LoginsComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'create', component: CreateComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginsRoutingModule { }

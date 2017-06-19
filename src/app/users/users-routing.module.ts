import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserMainComponent } from 'app/users/user-main/user-main.component';
import { UserEditComponent } from 'app/users/user-edit/user-edit.component';
import { PostDetailComponent } from 'app/shared/components/post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: 'post/:id', component: PostDetailComponent },
      { path: '', component: UserMainComponent },
      { path: 'edit', component: UserEditComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

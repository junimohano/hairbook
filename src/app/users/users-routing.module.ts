import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { PostDetailComponent } from 'app/users/post-detail/post-detail.component';
import { PostListComponent } from 'app/users/post-list/post-list.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: 'detail/:id', component: PostDetailComponent },
      { path: '', component: PostListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

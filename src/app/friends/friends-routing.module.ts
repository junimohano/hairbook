import { FriendComponent } from './friend/friend.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: FriendComponent,
    children: [
      // { path: 'post/:postId', component: PostDetailComponent },
      // { path: '', component: ExplorerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }

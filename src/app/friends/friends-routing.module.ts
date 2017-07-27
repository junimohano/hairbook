import { SearchComponent } from './search/search.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { FriendsComponent } from './friends.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: FriendsComponent,
    children: [
      { path: 'search', component: SearchComponent },
      { path: 'followers', component: FollowersComponent },
      { path: 'following', component: FollowingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }

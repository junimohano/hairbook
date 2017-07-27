import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { FriendEffects } from './shared/friend-effects';
import { FriendService } from './shared/friend.service';
import { FollowingComponent } from './following/following.component';
import { FollowersComponent } from './followers/followers.component';
import { FriendNavComponent } from './friend-nav/friend-nav.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    SharedModule,
    FriendsRoutingModule,
    EffectsModule.forFeature([FriendEffects])
  ],
  declarations: [
    FriendsComponent,
    FollowingComponent,
    FollowersComponent,
    FriendNavComponent,
    SearchComponent
  ],
  providers: [
    FriendService
  ]
})
export class FriendsModule { }

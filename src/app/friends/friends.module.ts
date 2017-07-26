import { FriendService } from './shared/friend.service';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FriendsRoutingModule } from './friends-routing.module';

import { EffectsModule } from '@ngrx/effects';
import { FriendEffects } from './shared/friend-effects';

import { FriendsComponent } from './friends.component';
import { FriendComponent } from './friend/friend.component';

@NgModule({
  imports: [
    SharedModule,
    FriendsRoutingModule,
    EffectsModule.forFeature([FriendEffects])
  ],
  declarations: [
    FriendsComponent,
    FriendComponent
  ],
  providers: [
    FriendService
  ]
})
export class FriendsModule { }

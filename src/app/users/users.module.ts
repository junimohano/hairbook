import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './shared/user-effects';

import { UsersComponent } from './users.component';
import { UserService } from './shared/user.service';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
    EffectsModule.run(UserEffects)
  ],
  declarations: [
    UsersComponent,
    PostListComponent,
    PostDetailComponent
  ],
  providers: [
    UserService
  ],
  entryComponents: [
    PostDetailComponent
  ]
})
export class UsersModule { }

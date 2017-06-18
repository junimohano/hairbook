import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './shared/user-effects';

import { UserService } from './shared/user.service';

import { UsersComponent } from './users.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserMainComponent } from './user-main/user-main.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PostSearchComponent } from './post-search/post-search.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
    EffectsModule.run(UserEffects)
  ],
  declarations: [
    UsersComponent,
    PostListComponent,
    PostDetailComponent,
    UserInfoComponent,
    UserMainComponent,
    UserEditComponent,
    PostSearchComponent
  ],
  providers: [
    UserService
  ],
  entryComponents: [
    PostDetailComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule { }

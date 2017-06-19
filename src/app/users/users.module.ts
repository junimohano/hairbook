import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './shared/user-effects';

import { UserService } from './shared/user.service';

import { UsersComponent } from './users.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserMainComponent } from './user-main/user-main.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
    EffectsModule.run(UserEffects)
  ],
  declarations: [
    UsersComponent,
    UserInfoComponent,
    UserMainComponent,
    UserEditComponent
  ],
  providers: [
    UserService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UsersModule { }

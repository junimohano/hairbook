import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';

import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './shared/post-effects';

import { PostsComponent } from './posts.component';
import { PostService } from './shared/post.service';

@NgModule({
  imports: [
    SharedModule,
    PostsRoutingModule,
    EffectsModule.run(PostEffects)
  ],
  declarations: [
    PostsComponent
  ],
  providers: [
    PostService
  ]
})
export class PostsModule { }

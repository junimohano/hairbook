import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './shared/post-effects';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from 'app/posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostService } from 'app/posts/shared/post.service';

@NgModule({
  imports: [
    SharedModule,
    PostsRoutingModule,
    EffectsModule.forFeature([PostEffects])
  ],
  declarations: [
    PostsComponent,
    PostComponent
  ],
  providers: [
    PostService
  ]
})
export class PostsModule { }

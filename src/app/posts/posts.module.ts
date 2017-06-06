import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';

import { PostsComponent } from './posts.component';
import { PostService } from './shared/post.service';

@NgModule({
  imports: [
    SharedModule,
    PostsRoutingModule
  ],
  declarations: [
    PostsComponent
  ],
  providers: [
    PostService
  ]
})
export class PostsModule { }

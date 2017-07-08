import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from 'app/posts/posts.component';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    SharedModule,
    PostsRoutingModule
  ],
  declarations: [
    PostsComponent,
    PostComponent
  ]
})
export class PostsModule { }

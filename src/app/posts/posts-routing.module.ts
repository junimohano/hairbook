import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from 'app/posts/post/post.component';
import { PostsComponent } from 'app/posts/posts.component';

const routes: Routes = [
  {
    path: '', component: PostsComponent,
    children: [
      { path: '', component: PostComponent },
      { path: ':postId', component: PostComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }

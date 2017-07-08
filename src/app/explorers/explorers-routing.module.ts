import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplorersComponent } from 'app/explorers/explorers.component';
import { ExplorerComponent } from 'app/explorers/explorer/explorer.component';
import { PostDetailComponent } from 'app/shared/components/post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '', component: ExplorersComponent,
    children: [
      { path: 'post/:postId', component: PostDetailComponent },
      { path: '', component: ExplorerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorersRoutingModule { }

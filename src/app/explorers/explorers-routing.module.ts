import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplorersComponent } from 'app/explorers/explorers.component';
import { ExplorerMainComponent } from 'app/explorers/explorer-main/explorer-main.component';
import { PostDetailComponent } from 'app/shared/components/post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '', component: ExplorersComponent,
    children: [
      { path: 'post/:id', component: PostDetailComponent },
      { path: '', component: ExplorerMainComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorersRoutingModule { }

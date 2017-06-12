import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplorersComponent } from 'app/explorers/explorers.component';

const routes: Routes = [
  {
    path: '', component: ExplorersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorersRoutingModule { }

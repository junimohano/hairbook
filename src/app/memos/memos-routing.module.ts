import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemosComponent } from './memos.component';

const routes: Routes = [
    {
    path: '', component: MemosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemosRoutingModule { }

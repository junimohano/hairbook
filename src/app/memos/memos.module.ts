import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MemosRoutingModule } from './memos-routing.module';

import { MemosComponent } from './memos.component';

@NgModule({
  imports: [
    SharedModule,
    MemosRoutingModule
  ],
  declarations: [
    MemosComponent
  ]
})
export class MemosModule { }

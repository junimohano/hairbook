import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ExplorersRoutingModule } from './explorers-routing.module';
import { ExplorersComponent } from './explorers.component';

import { ExplorerComponent } from './explorer/explorer.component';

@NgModule({
  imports: [
    SharedModule,
    ExplorersRoutingModule
  ],
  declarations: [
    ExplorersComponent,
    ExplorerComponent
  ],
  providers: [
  ],
  schemas: [
  ]
})
export class ExplorersModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ExplorersRoutingModule } from './explorers-routing.module';
import { ExplorersComponent } from './explorers.component';

import { ExplorerMainComponent } from './explorer-main/explorer-main.component';

@NgModule({
  imports: [
    SharedModule,
    ExplorersRoutingModule
  ],
  declarations: [
    ExplorersComponent,
    ExplorerMainComponent
  ],
  providers: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ExplorersModule { }

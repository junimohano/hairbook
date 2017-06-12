import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ExplorersRoutingModule } from './explorers-routing.module';
import { ExplorersComponent } from 'app/explorers/explorers.component';

@NgModule({
  imports: [
    SharedModule,
    ExplorersRoutingModule
  ],
  declarations: [ExplorersComponent]
})
export class ExplorersModule { }

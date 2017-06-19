import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ExplorersRoutingModule } from './explorers-routing.module';
import { ExplorersComponent } from './explorers.component';

import { EffectsModule } from '@ngrx/effects';
import { ExplorerEffects } from './shared/explorer-effects';

import { ExplorerService } from './shared/explorer.service';
import { ExplorerMainComponent } from './explorer-main/explorer-main.component';

@NgModule({
  imports: [
    SharedModule,
    ExplorersRoutingModule,
    EffectsModule.run(ExplorerEffects)
  ],
  declarations: [
    ExplorersComponent,
    ExplorerMainComponent
  ],
  providers: [
    ExplorerService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ExplorersModule { }

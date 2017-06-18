import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ExplorersRoutingModule } from './explorers-routing.module';
import { ExplorersComponent } from './explorers.component';
import { ExplorerSearchComponent } from './explorer-search/explorer-search.component';

import { EffectsModule } from '@ngrx/effects';
import { ExplorerEffects } from './shared/explorer-effects';

import { ExplorerService } from './shared/explorer.service';

@NgModule({
  imports: [
    SharedModule,
    ExplorersRoutingModule,
    EffectsModule.run(ExplorerEffects)
  ],
  declarations: [
    ExplorersComponent,
    ExplorerSearchComponent
  ],
  providers: [
    ExplorerService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ExplorersModule { }

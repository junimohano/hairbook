import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

// social login
import { SocialLoginModule } from 'angular4-social-login/dist';
import { config } from './shared/auth/auth.config';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './shared/shared-effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './shared/reducers';

// components
import { AppComponent } from './app.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    PageNotFoundComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    // social login
    SocialLoginModule.initialize(config),
    // ngrx
    EffectsModule.forRoot([SharedEffects]),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


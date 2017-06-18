import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './shared-effects';

// Auth0
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { Auth } from '../shared/auth/auth.service';
import { AuthGuard } from '../shared/auth/auth.guard';

// i18n
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Angular materials
import {
  MdButtonModule,
  MdCheckboxModule,
  MdCardModule,
  MdToolbarModule,
  MdMenuModule,
  MdIconModule,
  MdTabsModule,
  MdTooltipModule,
  MdDialogModule,
  MdInputModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdChipsModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdProgressBarModule
} from '@angular/material';

// Flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedService } from 'app/shared/shared.service';

// // components
// import { NavComponent } from './components/nav/nav.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// import { ProgressComponent } from './components/progress/progress.component';
import { ProgressCircleComponent } from './components/progress-circle/progress-circle.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
  }), http, options);
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
  // return new TranslateHttpLoader(http, 'i18n/', '.json');
}

const components = [
  // NavComponent,
  // FooterComponent,
  // PageNotFoundComponent,
  // ProgressComponent,
  ProgressCircleComponent
];

const modules = [
  CommonModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,

  MdButtonModule,
  MdCheckboxModule,
  MdCardModule,
  MdToolbarModule,
  MdMenuModule,
  MdIconModule,
  MdTabsModule,
  MdTooltipModule,
  MdDialogModule,
  MdInputModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdChipsModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdProgressBarModule
];

@NgModule({
  imports: [
    modules,
    EffectsModule.run(SharedEffects),
    // i18n
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  exports: [
    modules,
    EffectsModule,
    TranslateModule,
    components
  ],
  declarations: [
    components
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    Auth,
    AuthGuard,
    SharedService
  ]
})
export class SharedModule { }

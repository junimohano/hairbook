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

import { SharedService } from './shared.service';

// components
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostSearchComponent } from './components/post-search/post-search.component';

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
  ProgressSpinnerComponent,
  PostListComponent,
  PostDetailComponent,
  PostSearchComponent
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
  ],
  // entryComponents: [
  //   PostDetailComponent
  // ],
})
export class SharedModule { }

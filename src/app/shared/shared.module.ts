import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

// Auth
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { Auth } from '../shared/auth/auth.service';
import { AuthGuard } from '../shared/auth/auth.guard';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
  }), http, options);
}

// Social Login
import { SocialLoginModule, AuthServiceConfig } from 'angular4-social-login/dist/a4sl-flat';
import { provideConfig } from './auth/auth.config';

// i18n
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
  // return new TranslateHttpLoader(http, 'i18n/', '.json');
}

import 'hammerjs/hammer';

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
  MdProgressBarModule,
  MdSnackBarModule,
  MdSelectModule,
  MdAutocompleteModule,
  MdButtonToggleModule,
  MdRadioModule
} from '@angular/material';

// Flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

// components
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostSearchComponent } from './components/post-search/post-search.component';
import { PostListAllComponent } from './components/post-list-all/post-list-all.component';
import { SharedService } from 'app/shared/shared.service';
import { PostMenuComponent } from './components/post-menu/post-menu.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ImagePathPipe } from './pipes/image-path.pipe';

const components = [
  ProgressSpinnerComponent,
  PostListComponent,
  PostDetailComponent,
  PostSearchComponent,
  PostListAllComponent,
  PostMenuComponent,
  TimeAgoPipe,
  ImagePathPipe
];

const modules = [
  CommonModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,

  SocialLoginModule,

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
  MdProgressBarModule,
  MdSnackBarModule,
  MdSelectModule,
  MdAutocompleteModule,
  MdButtonToggleModule,
  MdRadioModule
];

@NgModule({
  imports: [
    modules,
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
    TranslateModule,
    components
  ],
  declarations: [
    components,
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    Auth,
    AuthGuard,
    SharedService,
    DatePipe
  ],
  // entryComponents: [
  //   PostDetailComponent
  // ],
})
export class SharedModule { }

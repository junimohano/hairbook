import { FacebookLoginProvider } from 'angular4-social-login/dist';
import { AuthServiceConfig, GoogleLoginProvider } from 'angular4-social-login/dist/a4sl-flat';

export const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('263625423731-ouj3astedumdud1r9d0e388tnvunqtb7.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('755204194662652')
  }
]);

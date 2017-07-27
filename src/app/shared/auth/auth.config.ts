import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login/dist/a4sl-flat';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('263625423731-ouj3astedumdud1r9d0e388tnvunqtb7.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('755204194662652')
  }
]);

export function provideConfig() {
  return config;
}










// export const providers = {
//   'google': {
//     'clientId': '263625423731-ouj3astedumdud1r9d0e388tnvunqtb7.apps.googleusercontent.com'
//   },
//   'facebook': {
//     'clientId': '755204194662652',
//     'apiVersion': 'v2.9'
//   }
// };

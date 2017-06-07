import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'logins', pathMatch: 'full' },
  { path: 'logins', loadChildren: './logins/logins.module#LoginsModule' },
  { path: 'posts', loadChildren: './posts/posts.module#PostsModule' },
  { path: 'memos', loadChildren: './memos/memos.module#MemosModule' },
  // { path: 'logins', component: './logins/logins.module#LoginsModule' },
  // { path: 'fighters', loadChildren: './fighters/fighters.module#FightersModule' },
  // { path: 'octagonGirls', loadChildren: './octagon-girls/octagon-girls.module#OctagonGirlsModule' },
  // {
  //     path: '',
  //     loadChildren: './layout/layout.module#LayoutModule',
  //     canActivate: [AuthGuard]
  // },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

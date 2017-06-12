import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'logins', pathMatch: 'full' },
  { path: 'logins', loadChildren: './logins/logins.module#LoginsModule' },
  { path: 'explorers', loadChildren: './explorers/explorers.module#ExplorersModule', canActivate: [AuthGuard] },
  { path: 'users', loadChildren: './users/users.module#UsersModule', canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import {LoggeduserguardGuard} from './loggeduserguard.guard';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggeduserguardGuard],
  },
  {
    path: 'planet/details/:id',
    component: PlanetDetailsComponent,
    canActivate: [LoggeduserguardGuard],
  },
  {
    path: '',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

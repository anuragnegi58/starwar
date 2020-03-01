import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PlanetComponent } from './planet/planet.component';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';

@NgModule({
  declarations: [AppComponent, LoginPageComponent, DashboardComponent, PlanetComponent, PlanetDetailsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

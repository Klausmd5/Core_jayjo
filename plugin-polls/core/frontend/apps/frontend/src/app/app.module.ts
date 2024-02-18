import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {MainframeConnectorModule} from "mainframe-connector";
import {SharedModule} from "./shared/shared.module";
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app-routing.module";
import {SettingsModule} from "./settings/settings.module";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [AppComponent],
  providers: [
    { provide: "BACKEND_URL", useValue: environment.backendURL }
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    MainframeConnectorModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    SharedModule,
    SettingsModule,
    HttpClientModule,
  ],
  exports: []
})
export class AppModule {
}

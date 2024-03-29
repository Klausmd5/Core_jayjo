﻿import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeatureEagerModule } from './feature-eager/feature-eager.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Configuration} from "./polls-backend";
import {AuthService} from "./core/auth.service";
import {ConfigService} from "./core/config.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FeatureEagerModule,
    AppRoutingModule
  ],
  // use environment.backend as reference to the backend URL
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: function initAuth(authService: AuthService) {
        return async () => {
          await authService.init();
        }
      },
      deps: [AuthService],
      multi: true
    },
    {
      provide: Configuration,
      useFactory: (configService: ConfigService) => configService.getConfiguration(),
      deps: [ConfigService],
      multi: false,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

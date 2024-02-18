import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import {FormsModule} from "@angular/forms";
import {CoreUiModule} from "core-ui";

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    CoreUiModule
  ],
  exports: [SettingsComponent]
})
export class SettingsModule { }

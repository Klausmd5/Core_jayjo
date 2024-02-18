import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PluginRoutingModule } from "./plugin-routing.module";
import { PluginComponent } from "./plugin.component";
import {MainframeConnectorModule} from "mainframe-connector";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [PluginComponent],
  imports: [CommonModule, PluginRoutingModule, MainframeConnectorModule, SharedModule],
})
export class PluginModule {}

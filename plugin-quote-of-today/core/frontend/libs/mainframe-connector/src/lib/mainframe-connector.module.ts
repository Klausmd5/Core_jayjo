import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PluginPlaceholderComponent} from "./plugin-placeholder/plugin-placeholder.component";
import {SizeMeModule} from "@eisberg-labs/ngx-size-me";

@NgModule({
  declarations: [
    PluginPlaceholderComponent
  ],
  imports: [
    CommonModule,
    SizeMeModule
  ],
  exports: [
    PluginPlaceholderComponent,
  ]
})
export class MainframeConnectorModule {
}

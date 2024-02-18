import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "plugin/:id",
    loadChildren: () =>
      import("./plugin/plugin.module").then((m) => m.PluginModule),
  },
  {
    path: "credits",
    loadChildren: () =>
      import("./credits/credits.module").then((m) => m.CreditsModule),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsModule),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./errors/errors.module").then(m => m.ErrorsModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

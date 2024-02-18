import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "onboarding",
    loadChildren: () =>
      import("./onboarding/onboarding.module").then((m) => m.OnboardingModule),
  },
];

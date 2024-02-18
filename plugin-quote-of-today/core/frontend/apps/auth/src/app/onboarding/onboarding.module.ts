import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OnboardingRoutingModule } from "./onboarding-routing.module";
import { OnboardingComponent } from "./onboarding.component";
import { LoginModule } from "../login/login.module";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "../login/login.component";
import {CoreUiModule} from "core-ui";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [OnboardingComponent],
    imports: [CommonModule, SharedModule, OnboardingRoutingModule, LoginModule, CoreUiModule, FormsModule],
  bootstrap: [OnboardingComponent],
})
export class OnboardingModule {}

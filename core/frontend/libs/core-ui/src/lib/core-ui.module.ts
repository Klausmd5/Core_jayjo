import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SynoButtonComponent } from "./syno-button/syno-button.component";
import { SynoEmailComponent } from "./syno-email/syno-email.component";
import { SynoPasswordComponent } from "./syno-password/syno-password.component";
import { FormsModule } from "@angular/forms";
import { SynoUsernameComponent } from "./syno-username/syno-username.component";
import { TablerIconsModule } from "angular-tabler-icons";
import { IconEyeglass, IconEyeglassOff } from "angular-tabler-icons/icons";
import { SynoIconButtonComponent } from "./syno-icon-button/syno-icon-button.component";
import { SynoSwitchComponent } from "./syno-switch/syno-switch.component";
import { SynoTagComponent } from "./syno-tag/syno-tag.component";
import { SynoSelectComponent } from "./syno-select/syno-select.component";
import { SynoSelectMultipleComponent } from "./syno-select-multiple/syno-select-multiple.component";
import {SynoTokenComponent} from "./syno-token/syno-token.component";
import { SynoAutofocusDirective } from "./syno-autofocus.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TablerIconsModule.pick({
      IconEyeglass,
      IconEyeglassOff,
    }),
  ],
  declarations: [
    SynoButtonComponent,
    SynoEmailComponent,
    SynoPasswordComponent,
    SynoUsernameComponent,
    SynoIconButtonComponent,
    SynoSwitchComponent,
    SynoTagComponent,
    SynoSelectComponent,
    SynoSelectMultipleComponent,
    SynoTokenComponent,
    SynoAutofocusDirective,
  ],
  exports: [
    SynoButtonComponent,
    SynoEmailComponent,
    SynoPasswordComponent,
    SynoUsernameComponent,
    SynoIconButtonComponent,
    SynoSwitchComponent,
    SynoTagComponent,
    SynoSelectComponent,
    SynoSelectMultipleComponent,
    SynoTokenComponent,
    SynoAutofocusDirective,
  ],
})
export class CoreUiModule {}

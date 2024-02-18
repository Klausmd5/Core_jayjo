import {NgModule} from "@angular/core";
import {TablerIconsModule} from "angular-tabler-icons";

import {
  IconCamera,
  IconHeart,
  IconBrandGithub,
  IconX,
  IconSearch,
  IconSettings,
  IconLayoutGrid,
  IconList,
  IconLogout,
  IconChevronDown,
  IconChevronUp,
  IconStar,
  IconUserSearch,
  IconHourglassLow,
  IconBorderAll,
  IconAffiliate,
  IconEyeglass,
  IconEyeglassOff,
} from "angular-tabler-icons/icons";

const icons = {
  IconCamera,
  IconHeart,
  IconBrandGithub,
  IconX,
  IconSearch,
  IconSettings,
  IconLayoutGrid,
  IconList,
  IconLogout,
  IconChevronDown,
  IconChevronUp,
  IconStar,
  IconAffiliate,
  IconUserSearch,
  IconHourglassLow,
  IconBorderAll,
  IconEyeglass,
  IconEyeglassOff,
};

@NgModule({
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {
}

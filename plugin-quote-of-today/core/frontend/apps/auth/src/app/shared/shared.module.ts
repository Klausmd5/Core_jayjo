import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { LogoFullComponent } from "./logo-full/logo-full.component";

@NgModule({
  declarations: [FooterComponent, LogoFullComponent],
  imports: [CommonModule],
  exports: [FooterComponent, LogoFullComponent],
})
export class SharedModule {}

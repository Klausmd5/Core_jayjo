import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreditsRoutingModule } from "./credits-routing.module";
import { CardsComponent } from "./cards/cards.component";
import { NgCreditCardModule } from "angular-credit-card";
import { CreditDashComponent } from "./credit-dash/credit-dash.component";

@NgModule({
  declarations: [CardsComponent, CreditDashComponent],
  imports: [CommonModule, CreditsRoutingModule, NgCreditCardModule],
})
export class CreditsModule {}

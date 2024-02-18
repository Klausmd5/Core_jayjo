import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CardsComponent } from "./cards/cards.component";
import { CreditDashComponent } from "./credit-dash/credit-dash.component";

const routes: Routes = [{ path: "", component: CreditDashComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditsRoutingModule { }

import { Component } from "@angular/core";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-credit-dash",
  templateUrl: "./credit-dash.component.html",
  styleUrls: ["./credit-dash.component.css"],
})
export class CreditDashComponent {
  plugins = environment.plugins;
  constructor() {}
}

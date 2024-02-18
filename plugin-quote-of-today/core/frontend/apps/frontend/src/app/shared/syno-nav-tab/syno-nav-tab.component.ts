import { Component, Input } from "@angular/core";

@Component({
  selector: "app-syno-nav-tab",
  templateUrl: "./syno-nav-tab.component.html",
  styleUrls: ["./syno-nav-tab.component.css"],
})
export class SynoNavTabComponent {
  @Input()
  public active: boolean = false;
}

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivePlugin } from "../../classes/activePlugin";
import { NavBarService } from "../../../core/nav-bar.service";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"],
})
export class TabComponent implements OnInit {
  @Input() title: string = "adfasdf";
  @Input() isActive: boolean = false;
  @Output() closeTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() openTab: EventEmitter<string> = new EventEmitter<string>();
  closable: boolean = true;

  constructor() {}
  ngOnInit(): void {
    this.closable = this.title !== "Home";
  }

  tabClick() {
    this.openTab.emit();
  }

  xClick() {
    this.closeTab.emit();
  }
}

import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MainframeNavService} from "mainframe-connector";
import {NavBarService} from "../core/nav-bar.service";
import {SearchService} from "../core/search.service";

@Component({
  selector: "app-plugin",
  templateUrl: "./plugin.component.html",
  styleUrls: ["./plugin.component.css"],
})
export class PluginComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private navService: MainframeNavService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.navService.openPlugin(params["id"]);
    });
  }
}

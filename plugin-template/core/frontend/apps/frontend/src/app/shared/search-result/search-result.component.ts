import {Component, Input} from "@angular/core";
import {Plugin} from "mainframe-connector";
import {SearchService} from "../../core/search.service";
import {NavBarService} from "../../core/nav-bar.service";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.css"],
})
export class SearchResultComponent {
  @Input() plugin: Plugin = null!;

  constructor(private searchService: SearchService,
              private navService: NavBarService) {
  }

  open() {
    this.searchService.isSearchShown.next(false);
    this.navService.openPlugin({
      id: this.plugin.id,
      name: this.plugin.name,
      active: true,
    });
  }
}

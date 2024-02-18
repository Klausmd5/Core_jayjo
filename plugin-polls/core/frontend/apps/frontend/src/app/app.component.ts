import { Component, OnInit } from "@angular/core";
import { SearchService } from "./core/search.service";
import { NavBarService } from "./core/nav-bar.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "frontend";
  isSearchShown: boolean = false;

  constructor(public searchService: SearchService) {}
  ngOnInit(): void {
    this.searchService.isSearchShown.subscribe((x) => {
      this.isSearchShown = x;
    });
  }
}

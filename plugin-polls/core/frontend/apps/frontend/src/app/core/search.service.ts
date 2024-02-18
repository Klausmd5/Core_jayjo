import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import {MainframeNavService} from "mainframe-connector";
import {NavBarService} from "./nav-bar.service";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  isSearchShown = new Subject<boolean>();

  constructor(private navService: MainframeNavService) {}
  toggleIsSearchShown(val: boolean) {
    this.isSearchShown.next(val);
    this.navService.openPlugin(null);
  }
}

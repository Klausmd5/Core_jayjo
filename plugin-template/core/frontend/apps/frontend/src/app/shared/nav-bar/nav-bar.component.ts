import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivePlugin } from "../classes/activePlugin";
import { NavBarService } from "../../core/nav-bar.service";
import { SearchService } from "../../core/search.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  tabs: ActivePlugin[] = [];
  public val: string = "";
  viewList: boolean = false;
  settingsShown: boolean = false;

  constructor(
    private navService: NavBarService,
    private changeDetection: ChangeDetectorRef,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.val = "nav";
    this.navService.openPlugins.subscribe((x) => {
      this.tabs = x;
      this.changeDetection.detectChanges();
    });
    this.searchService.isSearchShown.subscribe(x => {
      if (!x) this.showPlugin(this.tabs.find(tab => tab.active));
    });
    this.navService.getPlugins();
    this.navService.isListShown.subscribe((x) => this.viewList = x);
    this.navService.areSettingsShown.subscribe((x) => this.settingsShown = x);
    this.showPlugin(this.tabs.find(tab => tab.active));
  }

  closeTabClick(plugin: ActivePlugin) {
    this.navService.closePlugin(plugin.id);
    this.navService.activatePlugin("home");
    if (plugin.id === "settings") this.navService.toggleAreSettingsShown();
  }

  showPlugin(plugin: ActivePlugin | undefined): void {
    if (plugin) this.navService.activatePlugin(plugin.id);
  }

  searchClicked() {
    this.searchService.toggleIsSearchShown(true);
  }

  changeView() {
    this.navService.toggleIsListShown(!this.viewList);
  }

  showSettings() {
    this.navService.openSettings();
    this.navService.toggleAreSettingsShown();
  }
}

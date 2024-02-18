import {Component, OnInit} from "@angular/core";
import {
  IDTokenPayload,
  MainframeIdTokenService,
  MainframeNavService,
  Plugin,
  PluginListService,
} from "mainframe-connector";
import {setTagColors} from "core-ui";
import {NavBarService} from "../../core/nav-bar.service";
import {UserService} from "../../core/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private service: MainframeIdTokenService,
    private pluginService: PluginListService,
    public navService: MainframeNavService,
    public navBarService: NavBarService,
    public userService: UserService
  ) {}

  jwtPayload: IDTokenPayload | undefined;
  showDashboard!: boolean;

  plugins: Plugin[] = [];

  ngOnInit(): void {
    this.service.getJwt().then((jwt) => {
      this.jwtPayload = this.service.decodeJwt(jwt);
      this.getPlugins();
    });

    this.navService.openPlugin(null);
    this.navBarService.isListShown.subscribe((x) => {
      this.showDashboard = !x;
    });
    this.showDashboard = !this.navBarService.isListShown.getValue();
  }

  private getPlugins() {
    this.pluginService.getPluginList().then((plugins: Plugin[]) => {
      this.plugins = plugins.sort((a, b) => a.name.localeCompare(b.name));
      this.filterPlugins();

      const tags = [...new Set(this.plugins.flatMap((x) => x.tags))];
      setTagColors(tags);

      this.userService.getFavorites();
    });
  }

  private filterPlugins() {
    this.plugins = this.plugins.filter(p => {
      switch (this.jwtPayload!.rolle) {
        case "Administrator":
          return true;
        case "Lehrer":
          return p.targetUserGroups?.includes("Lehrer") || p.targetUserGroups?.includes("Schueler");
        case "Schueler":
          return p.targetUserGroups?.includes("Schueler");
      }
    });
  }
}

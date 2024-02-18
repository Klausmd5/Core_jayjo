import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {IDTokenPayload, MainframeIdTokenService, PluginListService} from "mainframe-connector";
import {Plugin} from "mainframe-connector";
import {UserService} from "../../core/user.service";
import {setTagColors} from "core-ui";
import {UserFavorite} from "../../shared/classes/userFavorite";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {

  @Input() plugins: Plugin[] = [];

  constructor(private userService: UserService) {
  }

  categories: Category[] = [];

  ngOnInit(): void {

    this.userService.favorites.subscribe((x:UserFavorite[]) => {
      const ids = x.map(plugin => plugin.pluginID);
      this.plugins.forEach(plugin => plugin.isFavourite = ids.includes(plugin.id));
      this.setCategories();
    });

    this.setCategories();
  }

  private setCategories() {
    this.categories = [
      new Category("Favoriten", "star", this.plugins.filter(x => x.isFavourite)),
      new Category("Meine", "user-search", this.plugins),
      new Category("Bald fällig", "hourglass-low", this.plugins),
      new Category("Alle", "border-all", this.plugins)];
  }
}

export class Category {
  constructor(
    public name: string | null,
    public icon: string,
    public plugins: Plugin[]) {
  }
}

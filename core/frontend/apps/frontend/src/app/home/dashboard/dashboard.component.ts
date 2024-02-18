import {Component, Input, OnInit} from "@angular/core";
import {MainframeIdTokenService, Plugin, UserRole} from "mainframe-connector";
import {UserService} from "../../core/user.service";
import {UserFavorite} from "../../shared/classes/userFavorite";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {

  msPerWeek = 604800000;

  @Input() plugins: Plugin[] = [];

  userRole: UserRole = null!;

  constructor(private userService: UserService, private tokenService: MainframeIdTokenService) {
  }

  categories: Category[] = [];

  ngOnInit(): void {
    this.userService.favorites.subscribe((x: UserFavorite[]) => {
      const ids = x.map(plugin => plugin.pluginID);
      this.plugins.forEach(plugin => plugin.isFavourite = ids.includes(plugin.id));
      this.setCategories();
    });

    this.tokenService.getJwt().then(jwt => {
      const payload = this.tokenService.decodeJwt(jwt);
      this.userRole = payload.rolle;
      this.setCategories();
    });
  }

  private setCategories() {
    this.categories = [
      new Category("Favoriten", "star", this.plugins.filter(x => x.isFavourite)),
      new Category("Meine", "user-search", this.plugins.filter(p => p.targetUserGroups?.includes(this.userRole))),
      new Category("Bald fällig", "hourglass-low", this.plugins.filter(p => Number(p.endDate) - Date.now() < this.msPerWeek && Number(p.endDate) > Date.now())),
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

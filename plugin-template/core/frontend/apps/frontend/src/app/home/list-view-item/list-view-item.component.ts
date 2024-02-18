import {Component, Input} from "@angular/core";
import {Plugin} from "mainframe-connector";
import {UserService} from "../../core/user.service";

@Component({
  // eslint-disable-next-line  @angular-eslint/component-selector
  selector: "tr[app-list-view-item]",
  templateUrl: "./list-view-item.component.html",
  styleUrls: ["./list-view-item.component.css"],
})
export class ListViewItemComponent {

  @Input() plugin!: Plugin;

  constructor(private userService: UserService) {}

  toNumber(str: string): number {
    return Number(str);
  }

  changeFavorite() {
    this.plugin.isFavourite = !this.plugin.isFavourite;
    if (this.plugin.isFavourite) this.userService.addFavorite(this.plugin.id);
    else this.userService.deleteFavorite(this.plugin.id);
  }
}

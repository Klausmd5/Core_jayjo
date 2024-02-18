import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {ActivePlugin} from "../shared/classes/activePlugin";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class NavBarService {
  openPlugins = new Subject<ActivePlugin[]>();
  isListShown = new BehaviorSubject<boolean>(false);
  private _openPlugins: ActivePlugin[] = [
    new ActivePlugin("home", "Home", true),
  ];

  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  getPlugins() {
    this.openPlugins.next(this._openPlugins);
  }

  openPlugin(plugin: ActivePlugin) {
    if (!this._openPlugins.find(x => x.id === plugin.id)) this._openPlugins.push(plugin);
    this.activatePlugin(plugin.id);
  }

  closePlugin(id: string | undefined) {
    if (!id) return;
    this._openPlugins = this._openPlugins.filter((p) => p.id !== id);
    this.openPlugins.next(this._openPlugins);
  }

  activatePlugin(id: string | undefined) {
    if (!id) return;
    this._openPlugins.forEach((x) => (x.active = x.id === id));
    this.openPlugins.next(this._openPlugins);
    if (id === "home") this.router.navigate(["/"]);
    else if (id === "settings") this.router.navigate(["/settings"]);
    else this.router.navigate(["/plugin/" + id]);
  }

  toggleIsListShown(val: boolean) {
    this.isListShown.next(val);
  }

  openSettings() {
    if (!this._openPlugins.find(x => x.id === "settings")) this._openPlugins.push(new ActivePlugin("settings","Settings",true));
    this.activatePlugin("settings");
  }
}

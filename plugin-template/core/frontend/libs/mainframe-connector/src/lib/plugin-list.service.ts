import {Injectable} from "@angular/core";
import {Plugin} from "./plugin";

@Injectable({
  providedIn: "root"
})
export class PluginListService {

  constructor() { }

  public getPluginList(): Promise<Plugin[]> {
    parent.postMessage({
      method: "getPluginList"
    }, "*");

    return new Promise<Plugin[]>((resolve) => {
      window.addEventListener("message", (event) => {
        if (event.data.method === "getPluginList") {
          resolve(event.data.data);
        }
      });
    });
  }
}

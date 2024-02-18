import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MainframeNavService {
  lastRect: { x: number, y: number, width: number, height: number } | null = null;

  constructor() {
  }

  public openPlugin(pluginId: string | null) {
    console.debug("Sending plugin open message: ", pluginId);
    window.parent.postMessage({ method: "loadPlugin", data: { id: pluginId } }, "*");
  }

  public resizePlugin(left: number, top: number, width: number, height: number) {
    const rect = {
      x: left,
      y: top,
      width,
      height
    };

    if (this.lastRect && this.lastRect.x === rect.x && this.lastRect.y === rect.y && this.lastRect.width === rect.width && this.lastRect.height === rect.height) {
      return;
    }

    this.lastRect = rect;

    console.debug("Sending plugin resize message: ", rect);
    window.parent.postMessage({
      method: "container",
      data: rect
    }, "*");
  }
}

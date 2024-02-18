import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PublicKeyService {

  constructor() {
  }

  getPublicKey(): Promise<ArrayBuffer> {
    return new Promise(resolve => {
      // TODO: Optimization: Unregister event listener after call. (everywhere, not just here)
      window.addEventListener("message", event => {
        if (event.data.method === "getPublicKey") {
          resolve(event.data.data);
        }
      });
      parent.postMessage({ method: "getPublicKey" }, "*");
    });
  }
}

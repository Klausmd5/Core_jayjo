import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MainframeService {

  constructor() {
  }

  login(username: string, password: string, redirect: boolean): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      window.addEventListener("message", (event) => {
        if (event.data.method === "success") {
          resolve();
        }
        if (event.data.method === "error") {
          reject(new Error(event.data.data.message));
        }
      });
    });

    window.parent.postMessage({
      method: "login",
      data: {
        username,
        password,
        redirect
      }
      // FIXME: Fix targetOrigin
    }, "*");

    return promise;
  }
}

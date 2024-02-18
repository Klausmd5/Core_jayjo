import { Injectable } from "@angular/core";
import { CredService } from "./core/cred.service";
import { MainframeService } from "./mainframe.service";

@Injectable({
  providedIn: "root"
})
export class OnboardingService {

  constructor(private mainframe: MainframeService, private credService: CredService) {
  }

  setEduvidualToken(token: string): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      window.addEventListener("message", (event) => {
        if(event.data.method === "success") {
          resolve();
        }
        if (event.data.method === "error") {
          reject(new Error(event.data.data.message));
        }
      });
    });

    window.parent.postMessage({ method: "saveToken", data: { token } }, "*");

    return promise;
  }

  async login(username: string, password: string, redirect: boolean) {
    const pwEncrypted = await this.credService.encryptPassword(password);
    await this.mainframe.login(username, pwEncrypted, redirect);
  }
}

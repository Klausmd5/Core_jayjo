import { Injectable } from "@angular/core";
import { PublicKeyService } from "mainframe-connector";

@Injectable({
  providedIn: "root"
})
export class CredService {

  constructor(private pkService: PublicKeyService) {
  }

  // https://stackoverflow.com/a/62967202/11864516

  async encryptPassword(pwPlain: string): Promise<string> {
    try {
      const publicKey = await this.pkService.getPublicKey();
      const pub = await this.importPublicKey(publicKey);
      const encrypted = await this.encryptRSA(pub, new TextEncoder().encode(pwPlain));
      // @ts-ignore
      const encryptedBase64 = window.btoa(this.ab2str(encrypted));
      console.log(encryptedBase64.replace(/(.{64})/g, "$1\n"));
      return encryptedBase64;
    } catch (error) {
      // TODO: better error handling
      console.log(error);
      return "";
    }
  }

  async importPublicKey(publicKey: BufferSource) {
    return await window.crypto.subtle.importKey(
      "spki",
      publicKey,
      {
        name: "RSA-OAEP",
        hash: "SHA-512",
      },
      true,
      ["encrypt"]
    );
  }

  async encryptRSA(key: CryptoKey, plaintext: ArrayBuffer) {
    return await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      key,
      plaintext
    );
  }
  ab2str(buf: Iterable<number>) {
    return String.fromCharCode.apply(null, Array.from(new Uint8Array(buf)));
  }
}

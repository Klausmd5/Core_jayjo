import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SynoBaseComponent} from "../syno-base/syno-base.component";

@Component({
  selector: "syno-username",
  templateUrl: "./syno-username.component.html",
})
export class SynoUsernameComponent extends SynoBaseComponent {
  @Input() username = "";
  @Output() usernameChange = new EventEmitter<string>();

  valid: boolean | null = null;
  override variant = "default";

  styleBase = "rounded-md block border w-80 p-3 pr-10 focus:outline-none focus:ring-1 ";
  styles = {
    "default": this.styleBase,
    "valid": this.styleBase + "bg-green-50 text-green-900 border-green-800 focus:border-green-900 focus:ring-green-700",
    "invalid": this.styleBase + "bg-red-50 text-red-900 ring-red-900 border-red-800 focus:border-red-900 focus:ring-red-700",
  };

  validate(username: string) {
    this.valid = username.length > 0;
    if (this.valid) this.usernameChange.emit(username);
    this.variant = this.valid === null ? "default" : (this.valid ? "valid" : "invalid");
  }
}

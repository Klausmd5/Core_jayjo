import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SynoBaseComponent} from "../syno-base/syno-base.component";

@Component({
  selector: "syno-email",
  templateUrl: "./syno-email.component.html",
})
export class SynoEmailComponent extends SynoBaseComponent {
  @Output() email = new EventEmitter<string | null>();
  value = "";

  valid: boolean | null = null
  validatorPattern = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
  override variant = "default";

  styleBase = "rounded-md block border w-80 p-3 pr-10 focus:outline-none focus:ring-1 ";
  styles = {
    "default": this.styleBase + "bg-gray-50 focus:ring-gray-500",
    "valid": this.styleBase + "bg-green-50 text-green-900 border-green-800 focus:border-green-900 focus:ring-green-700",
    "invalid": this.styleBase + "bg-red-50 text-red-900 ring-red-900 border-red-800 focus:border-red-900 focus:ring-red-700",
  };

  validate(email: string) {
    this.valid = email.length > 0 && email.match(this.validatorPattern) !== null;

    this.email.emit(this.valid ? email : null);

    this.variant = this.valid === null ? "default" : (this.valid ? "valid" : "invalid");
  }
}

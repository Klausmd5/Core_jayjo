import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {SynoBaseComponent} from "../syno-base/syno-base.component";

@Component({
  selector: "syno-token",
  templateUrl: "./syno-token.component.html",
})
export class SynoTokenComponent extends SynoBaseComponent {
  @Input() token = "";
  @Output() tokenChange = new EventEmitter<string>();
  @ViewChild("tokenHTML") tokenHTML: ElementRef | undefined;

  valid: boolean | null = null
  override variant = "default";

  styleBase = "rounded-md block border w-80 p-3 pr-10 focus:outline-none focus:ring-1 ";
  styles = {
    "default": this.styleBase + "bg-gray-50 focus:ring-gray-500",
    "valid": this.styleBase + "bg-green-50 text-green-900 border-green-800 focus:border-green-900 focus:ring-green-700",
    "invalid": this.styleBase + "bg-red-50 text-red-900 ring-red-900 border-red-800 focus:border-red-900 focus:ring-red-700",
  };

  validate(password: string) {
    this.valid = password.length > 0;
    if (this.valid) this.tokenChange.emit(password);
    this.variant = this.valid === null ? "default" : (this.valid ? "valid" : "invalid");
  }

  changePwVisibility() {
    if (!this.tokenHTML) return;
    const oldType = this.tokenHTML.nativeElement.type;
    this.tokenHTML.nativeElement.type = oldType === "password" ? "text" : "password";
  }
}

import {Component, Input} from "@angular/core";

@Component({
  selector: "syno-base",
  templateUrl: "./syno-base.component.html",
  styleUrls: ["./syno-base.component.css"],
})
export abstract class SynoBaseComponent {
  @Input() variant = "";
  @Input() disabled = false;
  @Input() includeClasses = "";
  @Input() excludeClasses = "";

  abstract styles: Record<string, string>;

  setClass() {
    let style = this.styles["default"];

    this.variant = this.variant.toLowerCase().trim();
    if (this.variant in this.styles) style = this.styles[this.variant];
    if (this.disabled && "disabled" in this.styles) style = this.styles["disabled"];

    style += " " + this.includeClasses;
    this.excludeClasses.split(" ").forEach(e => style = style.replace(e, ""));
    style = style.replace(new RegExp(/\s{2,}/), " ");

    return style;
  }
}

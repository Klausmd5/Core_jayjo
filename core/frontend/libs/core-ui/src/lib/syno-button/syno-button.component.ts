import {Component} from "@angular/core";
import {SynoBaseComponent} from "../syno-base/syno-base.component";

@Component({
  selector: "syno-button",
  templateUrl: "./syno-button.component.html",
  styleUrls: ["./syno-button.component.css"],
})
export class SynoButtonComponent extends SynoBaseComponent {

  styles = {
    "default": "bg-gradient-to-r from-synoblue to-synogreen h-10 rounded-lg p-[1.5px] pl-[1.6px] box-border flex justify-center items-center",
  };

}

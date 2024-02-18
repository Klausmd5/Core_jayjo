import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SynoBaseComponent} from "../syno-base/syno-base.component";

@Component({
  selector: "syno-select",
  templateUrl: "./syno-select.component.html",
  styleUrls: ["./syno-select.component.css"],
})
export class SynoSelectComponent extends SynoBaseComponent {

  @Input() options: string[] = [];
  @Output() selectionChanged = new EventEmitter<string>();

  styles: Record<string, string> = {
    "default": "bg-gradient-to-r from-synoblue to-synogreen rounded-lg p-[1.5px] pl-[1.6px] box-border flex justify-center items-center w-fit"
  };

}

import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from "@angular/core";
import {SynoBaseComponent} from "../syno-base/syno-base.component";

@Component({
  selector: "syno-switch",
  templateUrl: "./syno-switch.component.html",
  styleUrls: ["./syno-switch.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class SynoSwitchComponent extends SynoBaseComponent implements OnInit {
  @Output() stateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  _active = false;

  styles = {
    "default": "rounded-full flex w-fit p-1 relative gap-2 cursor-pointer text-synogray-550",
  };

  ngOnInit() {
    if (this.disabled) this.excludeClasses += "cursor-pointer";
  }

  switchState() {
    if (this.disabled) return;
    this._active = !this._active;
    this.stateChanged.emit(this._active);
  }
}

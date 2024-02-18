import {Component} from "@angular/core";
import {SynoBaseComponent} from "../syno-base/syno-base.component";

/*
Usage: Pass an <i-tabler/> element as a child.
Prerequesites: The required items have to be imported in the module. See https://www.npmjs.com/package/angular-tabler-icons.
Usage Example:
  <syno-icon-button>
    <i-tabler name="settings"/>
  </syno-icon-button>
 */
@Component({
  selector: "syno-icon-button",
  templateUrl: "./syno-icon-button.component.html",
  styleUrls: ["./syno-icon-button.component.css"],
})
export class SynoIconButtonComponent extends SynoBaseComponent {

  styles = {
    "default": "h-10 w-10 flex justify-center border-synogray-350 items-center hover:border-[1px] border-[1.4px] focused:border-[1px] hover:bg-synogray-300/50 backdrop-blur-lg bg-synogray-0 rounded-full text-synogray-550",
  }

}

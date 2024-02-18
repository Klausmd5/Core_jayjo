import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {SynoBaseComponent} from "../syno-base/syno-base.component";

@Component({
  selector: "syno-select-multiple",
  templateUrl: "./syno-select-multiple.component.html",
  styleUrls: ["./syno-select-multiple.component.css"],
})
export class SynoSelectMultipleComponent extends SynoBaseComponent implements OnInit {

  @Input() title = "";
  @Input() items: SelectOption[] = [];
  @Output() selectionChanged = new EventEmitter<SelectOption[]>();

  label = "";
  showOptions = false;

  styles: Record<string, string> = {
    "default": "bg-gradient-to-r from-synoblue to-synogreen rounded-lg p-[1.5px] pl-[1.6px] box-border flex justify-center items-center shrink-0"
  };

  ngOnInit() {
    this.notifySelectedChanged();
  }

  updateSelection(title: string): void {
    const item = this.items.find(i => i.title === title);
    if (item === undefined) return;
    item.checked = !item.checked;
    this.notifySelectedChanged();
  }

  notifySelectedChanged(): void {
    const options = this.items.filter(i => i.checked);
    this.selectionChanged.emit(options);
    const titles = options.map(i => i.title);
    this.label = titles.length > 0 ? titles.join(", ") : this.title;
  }

}

export interface SelectOption {
  title: string,
  checked: boolean,
}

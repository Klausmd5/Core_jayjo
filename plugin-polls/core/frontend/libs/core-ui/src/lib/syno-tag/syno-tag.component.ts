import {Component, Input, OnInit} from "@angular/core";
import {tagColors} from "./tagColors";
import {SynoBaseComponent} from "../syno-base/syno-base.component";

@Component({
  selector: "syno-tag",
  templateUrl: "./syno-tag.component.html",
  styleUrls: ["./syno-tag.component.css"],
})
export class SynoTagComponent extends SynoBaseComponent implements OnInit {

  @Input() name = "";
  hexColor: string | undefined;

  style = "";

  styles: Record<string, string> = {
    "default": "border-[0.15em] border-solid font-bold py-[0.1em] px-[0.7em] w-fit rounded-[10px]",
  }

  ngOnInit(): void {
    this.hexColor = tagColors.get(this.name);

    // The color must be set this schiachly because tailwind can't ship this kind of dynamically generated classes
    // Mapping the colors beforehand would be possible (https://tailwindcss.com/docs/content-configuration#dynamic-class-names),
    // but that seems like a lot of work for not a lot of improvement
    this.style += `background: ${this.hexColor}40;`;
    this.style += `color: ${this.hexColor};`
    this.style += `border-color: ${this.hexColor};`
  }

}

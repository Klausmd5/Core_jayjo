import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { MainframeNavService } from "../mainframe-nav.service";
import { SizeMeDim } from "@eisberg-labs/ngx-size-me";

@Component({
  selector: "mainframe-plugin-placeholder",
  templateUrl: "./plugin-placeholder.component.html",
  styleUrls: ["./plugin-placeholder.component.css"]
})
export class PluginPlaceholderComponent implements OnInit, OnDestroy {
  intervalId: number | null = null;

  constructor(private mainframeNavService: MainframeNavService, private elementRef: ElementRef) {
  }

  handleResize(event: SizeMeDim) {
    this.mainframeNavService.resizePlugin(
      event.position?.left ?? 0,
      event.position?.top ?? 0,
      event.width ?? 0,
      event.height ?? 0
    );
  }

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      this.mainframeNavService.resizePlugin(rect.left, rect.top, rect.width, rect.height);
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}

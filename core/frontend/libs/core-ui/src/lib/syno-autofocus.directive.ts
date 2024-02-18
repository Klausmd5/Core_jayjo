import {Directive, ElementRef, OnInit} from "@angular/core";

@Directive({
  selector: "[synoAutofocus]"
})
export class SynoAutofocusDirective implements OnInit {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }

}

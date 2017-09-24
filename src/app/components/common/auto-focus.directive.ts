import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[zpAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  @Input('zpAutoFocus') autoFocus: boolean;

  constructor(private  elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    if (this.autoFocus && this.elementRef.nativeElement.focus) {
      this.elementRef.nativeElement.focus();
    }
  }
}

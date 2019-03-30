import { Directive, Renderer2, ElementRef, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[appImage]'
})
export class ImageDirective {
  @HostListener('input', ['$event']) inputHandler(event) {
    this.changeStyling();
  }

  changeStyling() {
    const isValid = this.isValid();

    if (isValid) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'border-left', '5px solid #42A948');
      this.form.controls["imageUrl"].setErrors(null);
      return;
    }

    this.form.controls["imageUrl"].setErrors({ 'incorrect': true });
    this.renderer.setStyle(this.elementRef.nativeElement, 'border-left', '5px solid #A94442');
  }

  isValid() {
    const inputValue = this.elementRef.nativeElement.value;

    return inputValue.startsWith("https") && (inputValue.endsWith("png") || inputValue.endsWith("jpg"));
  }

  constructor(public renderer: Renderer2, public elementRef: ElementRef, private form: NgForm) { }

}

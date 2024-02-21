import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[setValidFlag]',
})
export class ValidateInputDirective implements OnInit {
  @Input('setValidFlag') control: AbstractControl;
  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  @HostListener('blur') onMouseLeave() {
    const element = this.el.nativeElement;
    if (this.control.touched) {
      if (this.control.valid) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
      } else if (this.control.invalid) {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
      }
    } else {
      element.classList.remove('is-valid', 'is-invalid');
    }
  }
}

import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true
    }
  ],
})
export class EmailValidatorDirective implements Validator {

  validate(control: AbstractControl) {
    const isEmailValid = /^\w+@\w+\..{2,3}(.{2,3})?$/.test(control.value);

    return !isEmailValid ? { invalidEmail: true } : null;
  }
}

import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true
    }
  ]
})
export class PasswordValidatorDirective implements Validator {

  validate(control: AbstractControl) {
    const isPasswordValid = /^[A-Za-z0-9]{3,16}$/.test(control.value);

    return !isPasswordValid ? { invalidPassword: true } : null;
  }
}

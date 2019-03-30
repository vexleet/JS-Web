import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appPhoneNumberValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhoneNumberValidatorDirective,
      multi: true
    }
  ]
})
export class PhoneNumberValidatorDirective implements Validator {

  validate(control: AbstractControl) {
    const isPhoneNumberValid = /^\d{9}$/.test(control.value);

    return !isPhoneNumberValid ? { invalidPhoneNumber: true } : null;
  }

}

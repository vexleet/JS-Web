import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appFullNameValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FullNameValidatorDirective,
      multi: true
    }
  ]
})
export class FullNameValidatorDirective implements Validator {

  validate(control: AbstractControl) {
    const isNameValid = /^[A-Z]+[a-z]* [A-Z]+[a-z]*$/.test(control.value);

    return !isNameValid ? { invalidName: true } : null;
  }

}

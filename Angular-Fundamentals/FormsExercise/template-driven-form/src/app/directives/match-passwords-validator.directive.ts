import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appMatchPasswordsValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordsValidatorDirective,
      multi: true
    }
  ]
})
export class MatchPasswordsValidatorDirective implements Validator {

  validate(control: AbstractControl) {
    return control.value["password"] !== control.value["repeatPassword"]
      ? { invalidPasswordMatch: true } : null;
  }

}

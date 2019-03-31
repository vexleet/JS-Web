import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isEmailValid = /^\w+@\w+\..{2,3}(.{2,3})?$/.test(control.value);

    return !isEmailValid ? { 'email': { value: control.value } } : null;
  };
}

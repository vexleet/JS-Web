import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isPasswordValid = /^[A-Za-z0-9]{3,16}$/.test(control.value);

    return !isPasswordValid ? { 'password': { value: control.value } } : null;
  };
}

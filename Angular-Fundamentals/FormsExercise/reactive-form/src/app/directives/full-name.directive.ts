import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isNameValid = /^[A-Z]{1}[a-z]* [A-Z]{1}[a-z]*$/.test(control.value);

    return !isNameValid ? { 'fullName': { value: control.value } } : null;
  };
}

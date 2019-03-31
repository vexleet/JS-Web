import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isPhoneNumberValid = /^\d{9}$/.test(control.value);

    return !isPhoneNumberValid ? { 'phoneNumber': { value: control.value } } : null;
  };
}

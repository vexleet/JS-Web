import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const passwordsMatch = control.value["password"] === control.value["repeatPassword"];

    return !passwordsMatch ? { 'passwordsMatch': { value: control.value } } : null;
  };
}

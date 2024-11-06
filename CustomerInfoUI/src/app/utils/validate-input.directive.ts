import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function notNullOrEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null || control.value.trim() === '') {
      return { 'notEmpty': true };
    }
    return null;
  };
}

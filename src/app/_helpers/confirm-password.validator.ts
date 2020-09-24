import { FormGroup } from '@angular/forms';

/**
 * Validator to match two password fields in form
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 * @param controlName
 * @param matchingControlName
 * @returns
 */
export function ConfirmPasswordValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmPasswordValidator
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

import {
  AbstractControl,
  Form,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    value
  );

  if (!value) {
    return null;
  }

  if (!isValidEmail) {
    return { invalidEmail: true };
  }

  return null;
}

export function passwordMismatch(passwordFormControl: AbstractControl) {
  return (rePasswordFormControl: AbstractControl): ValidationErrors | null => {
    if (passwordFormControl.value !== rePasswordFormControl.value) {
      return { passwordsNotMatch: true };
    }

    return null;
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  static passwordMatch(
    firstControlName: string,
    secondControlName: string
  ): ValidatorFn {
    return (group: AbstractControl) => {
      const password = group.get(firstControlName);
      const confirmPassword = group.get(secondControlName);
      if (!password || !confirmPassword) {
        return { controlNotFound: true };
      } else if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordsDontMatch: true });
        return { passwordsDontMatch: true };
      } else {
        return null;
      }
    };
  }
}

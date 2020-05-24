import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ConnectIngBaseService} from '../adapter/base/AbstractBaseService';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent {

  public loading = false;
  public error = '';

  // and password Validators.pattern('/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/')
  registerData: FormGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),

      // TODO not required due to Linkando API might be removed
      // username: new FormControl('', [Validators.required]),
      // password: new FormControl('', [Validators.required]),
      // passwordConfirmation: new FormControl('', [Validators.required, Validators.min(3)])
    },
    // RegisterDialogComponent.passwordMatching
  );
  private baseService: ConnectIngBaseService;

  // TODO: add regular expression for email Validators.pattern('/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/')

  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>,
              baseService: ConnectIngBaseService) {
    this.baseService = baseService;
  }

  /*
  // TODO: show that the passwords are mismatching
  private static passwordMatching(fGroup: FormGroup) {
    if (fGroup.get('password').value != null) {
      return fGroup.get('password').value === fGroup.get('passwordConfirmation').value
        ? null : {mismatch: true};
    }
  }
  */

  register() {
    console.log('Register attempt');
    if (this.registerData.invalid) {
      return;
    }
    this.loading = true;
    window.location.reload();
    this.baseService.registerUserAsync(this.registerData.value.email,
      this.registerData.value.firstName,
      this.registerData.value.lastName,
      (isSuccess: boolean, errorMessage: string) => {
        if (isSuccess) {
          console.log('Successful Registration');
          this.dialogRef.close(true);
        } else {
          console.log(errorMessage);
          this.error = errorMessage;
          this.loading = false;
          window.location.reload();
        }
      });
  }
}

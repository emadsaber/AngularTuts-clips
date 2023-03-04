import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmailTaken } from '../validators/email-taken';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService, private emailTaken: EmailTaken){}

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ], [this.emailTaken.validate]);
  age = new FormControl('', [
    Validators.min(15),
    Validators.max(70)
  ]);
  password =  new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirm_password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14),
  ]);

  registerForm: FormGroup = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  }, [RegisterValidators.passwordMatch('password', 'confirm_password')])

  alertColor = 'blue';
  alertMessage = 'Account Created!';
  showAlert = false;

  async save(){
    const {email, password} = this.registerForm.value;
    try {
      
      await this.auth.createUser(this.registerForm.value);
      this.alertColor = 'green';
      this.alertMessage = 'Success! Account created :)';
    } catch (error) {
      console.log(error);
      this.alertColor = 'red';
      this.alertMessage = 'Unexpected error occurred, please try again later.';
    }
    this.showAlert = true;
  }
}

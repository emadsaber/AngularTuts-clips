import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  alertColor = 'blue';
  showAlert = false;
  alertMsg = '';
  isSubmission = false;

  credentials = {
    email: '',
    password: '',
  };

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async login() {
    this.isSubmission = true;
    this.alertMsg = 'Please wait....';
    this.showAlert = true;
    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
      this.showAlert = false;
    } catch (error) {
      this.isSubmission = false;
      this.alertMsg = 'Failed to login!';
      this.alertColor = 'red';
      this.showAlert = true;
    }

    console.log(this.credentials); 
  }
}

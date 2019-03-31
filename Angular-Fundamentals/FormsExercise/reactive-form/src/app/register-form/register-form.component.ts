import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fullNameValidator } from '../directives/full-name.directive';
import { emailValidator } from '../directives/email.directive';
import { phoneNumberValidator } from '../directives/phone-number.directive';
import { passwordValidator } from '../directives/password.directive';
import { matchPasswordsValidator } from '../directives/match-passwords.directive';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm = this.fb.group({
    fullName: ['', [Validators.required, fullNameValidator()]],
    email: ['', [Validators.required, emailValidator()]],
    phoneCode: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
    jobTitle: ['', [Validators.required]],
    passwords: this.fb.group({
      password: ['', [Validators.required, passwordValidator()]],
      repeatPassword: ['', [Validators.required, passwordValidator()]],
    }, { validator: matchPasswordsValidator() }),
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.registerForm.value);

    this.registerForm.reset();
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  get passwords() {
    return this.registerForm.get('passwords');
  }

  get password() {
    return this.registerForm.get('passwords').get('password');
  }

  get repeatPassword() {
    return this.registerForm.get('passwords').get('repeatPassword');
  }
}

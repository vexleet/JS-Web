import { AuthService } from './../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  loginUser() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(data => {
      this.authService.setCredentials(data);
      this.toastr.success(data.message);
      this.router.navigate(['/home']);
    }, err => console.error(err));
  }

}

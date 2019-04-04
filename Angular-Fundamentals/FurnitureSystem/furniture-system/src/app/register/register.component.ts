import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    email: ['', [Validators.required]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  registerUser() {
    const { email, name, password } = this.registerForm.value;

    this.authService.register(email, name, password).subscribe(data => {
      this.toastr.success(data.message);
      this.router.navigate(['/login']);
    }, err => this.toastr.error("ERROR!"));
    //TODO: Fix toatr error
  }

}

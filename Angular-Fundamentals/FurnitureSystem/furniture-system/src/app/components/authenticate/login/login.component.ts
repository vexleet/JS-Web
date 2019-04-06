import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/[^@]+@[^\.]+\..+/)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loginUser() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.authService.setCredentials(data);
        this.toastr.success(data['message']);
        this.router.navigate(['/home']);
      }, err => console.error(err));
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}

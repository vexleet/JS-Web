import { AuthService } from '../../../core/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/[^@]+@[^\.]+\..+/)]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
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

  registerUser() {
    const { email, name, password } = this.registerForm.value;

    this.authService.register(email, name, password)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.toastr.success(data['message']);
        this.router.navigate(['/login']);
      });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

}

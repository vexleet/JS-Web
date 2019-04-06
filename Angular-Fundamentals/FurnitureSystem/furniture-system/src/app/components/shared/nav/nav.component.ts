import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  logout() {
    this.toastr.success('You have successfully logged out');
    this.authService.clearStorage();
  }

}

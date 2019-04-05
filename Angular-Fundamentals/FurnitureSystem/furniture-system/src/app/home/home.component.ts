import { AuthService } from './../services/auth.service';
import { FurnitureService } from './../services/furniture.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //TODO: Add interface
  furnitures$: Observable<any>;

  constructor(private furnitureService: FurnitureService, public authService: AuthService) {
    if (!this.authService.isLoggedIn) {
      this.furnitures$ = this.furnitureService.loadFurniture();
    }
  }

  ngOnInit() {
  }

}

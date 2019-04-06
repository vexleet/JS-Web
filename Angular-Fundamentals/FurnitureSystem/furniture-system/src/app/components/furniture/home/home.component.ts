import { AuthService } from '../../../core/services/auth.service';
import { FurnitureService } from '../../../core/services/furniture.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFurniture } from '../../../core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  furnitures$: Observable<IFurniture>;

  constructor(private furnitureService: FurnitureService, public authService: AuthService) {
    if (!this.authService.isLoggedIn) {
      this.furnitures$ = this.furnitureService.loadFurniture();
    }
  }

  ngOnInit() {
  }

}

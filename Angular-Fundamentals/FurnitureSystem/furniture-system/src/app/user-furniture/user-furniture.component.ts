import { FurnitureService } from './../services/furniture.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-furniture',
  templateUrl: './user-furniture.component.html',
  styleUrls: ['./user-furniture.component.css']
})
export class UserFurnitureComponent implements OnInit {
  userFurniture$: Observable<any>;

  constructor(private furnitureService: FurnitureService) {
    this.userFurniture$ = this.furnitureService.loadUserFurniture();
  }

  ngOnInit() {
  }

}

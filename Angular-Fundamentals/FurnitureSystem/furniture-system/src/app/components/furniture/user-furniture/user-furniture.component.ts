import { FurnitureService } from '../../../core/services/furniture.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFurniture } from '../../../core/models';

@Component({
  selector: 'app-user-furniture',
  templateUrl: './user-furniture.component.html',
  styleUrls: ['./user-furniture.component.css']
})
export class UserFurnitureComponent implements OnInit {
  userFurniture$: Observable<IFurniture>;

  constructor(private furnitureService: FurnitureService) {
    this.userFurniture$ = this.furnitureService.loadUserFurniture();
  }

  ngOnInit() {
  }

}

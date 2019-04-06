import { FurnitureService } from './../services/furniture.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IFurniture } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FurnitureDetailsResolver {

  constructor(private furnitureService: FurnitureService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFurniture> {
    let furnitureId = route.params["id"];

    return this.furnitureService.loadFurnitureDetails(furnitureId);
  }
}

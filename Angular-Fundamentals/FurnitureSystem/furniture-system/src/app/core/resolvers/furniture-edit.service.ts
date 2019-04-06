import { FurnitureService } from './../services/furniture.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FurnitureEditResolver implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const furnitureId = route.params['id'];

    return this.furnitureService.findFurniture(furnitureId);
  }

  constructor(private furnitureService: FurnitureService) { }
}

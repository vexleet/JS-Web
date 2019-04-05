import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private http: HttpClient) { }

  createFurniture(
    make: string,
    model: string,
    year: number,
    description: string,
    price: number,
    image: string,
    material: string) {
    return this.http.post<any>('furniture/create',
      { make, model, year, description, price, image, material });
  }

  loadFurniture() {
    return this.http.get<any>('furniture/all');
  }

  loadUserFurniture() {
    return this.http.get<any>('furniture/user');
  }

  loadFurnitureDetails(furnitureId: string) {
    return this.http.get<any>(`furniture/details/${furnitureId}`);
  }
}

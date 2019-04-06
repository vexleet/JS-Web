import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFurniture } from '../models';

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
    return this.http.post<IFurniture>('furniture/create',
      { make, model, year, description, price, image, material });
  }

  loadFurniture() {
    return this.http.get<IFurniture>('furniture/all');
  }

  loadUserFurniture() {
    return this.http.get<IFurniture>('furniture/user');
  }

  loadFurnitureDetails(furnitureId: string) {
    return this.http.get<IFurniture>(`furniture/details/${furnitureId}`);
  }

  deleteFurniture(furnitureId: string) {
    return this.http.delete(`furniture/delete/${furnitureId}`);
  }

  editFurniture(
    make: string,
    model: string,
    year: number,
    description: string,
    price: number,
    image: string,
    material: string,
    furnitureId: string) {
    return this.http.put<IFurniture>(`furniture/edit/${furnitureId}`,
      { make, model, year, description, price, image, material });
  }

  findFurniture(furnitureId: string) {
    return this.http.get<any>(`furniture/${furnitureId}`);
  }
}

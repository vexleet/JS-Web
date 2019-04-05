import { FurnitureService } from './../services/furniture.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css']
})
export class CreateFurnitureComponent implements OnInit {
  createFurnitureForm = this.fb.group({
    make: ['', [Validators.required, Validators.minLength(4)]],
    model: ['', [Validators.required, Validators.minLength(4)]],
    year: ['', [Validators.required, Validators.min(1950), Validators.max(2050)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: ['', [Validators.required, Validators.min(1)]],
    image: ['', [Validators.required]],
    material: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private furnitureService: FurnitureService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  createFurniture() {
    const { make, model, year, description, price, image, material } = this.createFurnitureForm.value;

    this.furnitureService.createFurniture(make, model, year, description, price, image, material)
      .subscribe(data => {
        this.toastr.success(data.message);
        this.router.navigate(['/home']);
      });
  }

  get make() {
    return this.createFurnitureForm.get('make');
  }

  get model() {
    return this.createFurnitureForm.get('model');
  }

  get year() {
    return this.createFurnitureForm.get('year');
  }

  get description() {
    return this.createFurnitureForm.get('description');
  }

  get price() {
    return this.createFurnitureForm.get('price');
  }

  get image() {
    return this.createFurnitureForm.get('image');
  }

  get material() {
    return this.createFurnitureForm.get('material');
  }

}

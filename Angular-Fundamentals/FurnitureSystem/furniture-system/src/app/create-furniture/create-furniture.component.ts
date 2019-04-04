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
    make: ['', [Validators.required]],
    model: ['', [Validators.required]],
    year: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    image: ['', [Validators.required]],
    material: ['', Validators.required]
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
      }, err => console.error(err));
  }

}

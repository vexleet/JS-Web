import { FurnitureService } from '../../../core/services/furniture.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css']
})
export class CreateFurnitureComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  createFurniture() {
    const { make, model, year, description, price, image, material } = this.createFurnitureForm.value;

    this.furnitureService.createFurniture(make, model, year, description, price, image, material)
      .pipe(takeUntil(this.ngUnsubscribe))
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

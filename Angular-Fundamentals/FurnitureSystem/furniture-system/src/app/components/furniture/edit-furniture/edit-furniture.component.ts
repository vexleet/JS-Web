import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FurnitureService } from '../../../core/services/furniture.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFurniture } from '../../../core/models';

@Component({
  selector: 'app-edit-furniture',
  templateUrl: './edit-furniture.component.html',
  styleUrls: ['./edit-furniture.component.css']
})
export class EditFurnitureComponent implements OnInit, OnDestroy {
  furniture: IFurniture;
  editFurnitureForm = null;
  private ngUnsubscribe = new Subject();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private furnitureService: FurnitureService,
    private toastr: ToastrService) {
    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.furniture = data["furniture"];

        this.editFurnitureForm = this.fb.group({
          make: [this.furniture.make, [Validators.required, Validators.minLength(4)]],
          model: [this.furniture.model, [Validators.required, Validators.minLength(4)]],
          year: [this.furniture.year, [Validators.required, Validators.min(1950), Validators.max(2050)]],
          description: [this.furniture.description, [Validators.required, Validators.minLength(10)]],
          price: [this.furniture.price, [Validators.required, Validators.min(1)]],
          image: [this.furniture.image, [Validators.required]],
          material: [this.furniture.material]
        });
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  editFurniture() {
    const { make, model, year, description, price, image, material } = this.editFurnitureForm.value;
    const furnitureId = this.route.snapshot.params['id'];

    this.furnitureService.editFurniture(make, model, year, description, price, image, material, furnitureId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.toastr.success(data.message);
        this.router.navigate(['/home']);
      });
  }

  get make() {
    return this.editFurnitureForm.get('make');
  }

  get model() {
    return this.editFurnitureForm.get('model');
  }

  get year() {
    return this.editFurnitureForm.get('year');
  }

  get description() {
    return this.editFurnitureForm.get('description');
  }

  get price() {
    return this.editFurnitureForm.get('price');
  }

  get image() {
    return this.editFurnitureForm.get('image');
  }

  get material() {
    return this.editFurnitureForm.get('material');
  }

}

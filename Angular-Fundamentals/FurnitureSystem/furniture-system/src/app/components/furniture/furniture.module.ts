import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFurnitureComponent } from './create-furniture/create-furniture.component';
import { UserFurnitureComponent } from './user-furniture/user-furniture.component';
import { FurnitureDetailsComponent } from './furniture-details/furniture-details.component';
import { DeleteFurnitureComponent } from './delete-furniture/delete-furniture.component';
import { EditFurnitureComponent } from './edit-furniture/edit-furniture.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CreateFurnitureComponent,
    UserFurnitureComponent,
    FurnitureDetailsComponent,
    DeleteFurnitureComponent,
    EditFurnitureComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    CreateFurnitureComponent,
    UserFurnitureComponent,
    FurnitureDetailsComponent,
    DeleteFurnitureComponent,
    EditFurnitureComponent,
  ]
})
export class FurnitureModule { }

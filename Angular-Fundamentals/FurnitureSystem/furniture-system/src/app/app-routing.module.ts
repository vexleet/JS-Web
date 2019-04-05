import { FurnitureDetailsComponent } from './furniture-details/furniture-details.component';
import { CreateFurnitureComponent } from './create-furniture/create-furniture.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFurnitureComponent } from './user-furniture/user-furniture.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DeleteFurnitureComponent } from './delete-furniture/delete-furniture.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'create',
    component: CreateFurnitureComponent,
  },
  {
    path: 'user/furniture',
    component: UserFurnitureComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'furniture/details/:id',
    component: FurnitureDetailsComponent,
  },
  {
    path: 'furniture/delete/:id',
    component: DeleteFurnitureComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

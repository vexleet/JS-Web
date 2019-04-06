import { AuthGuard } from './components/authenticate/guards/auth.guard';
import { FurnitureDetailsComponent } from './components/furniture/furniture-details/furniture-details.component';
import { CreateFurnitureComponent } from './components/furniture/create-furniture/create-furniture.component';
import { HomeComponent } from './components/furniture/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFurnitureComponent } from './components/furniture/user-furniture/user-furniture.component';
import { RegisterComponent } from './components/authenticate/register/register.component';
import { LoginComponent } from './components/authenticate/login/login.component';
import { DeleteFurnitureComponent } from './components/furniture/delete-furniture/delete-furniture.component';
import { EditFurnitureComponent } from './components/furniture/edit-furniture/edit-furniture.component';
import { FurnitureEditResolver } from './core/resolvers/furniture-edit.service';
import { FurnitureDetailsResolver } from './core/resolvers/furniture-details.service';

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
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'furniture',
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateFurnitureComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        component: UserFurnitureComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'details/:id',
        component: FurnitureDetailsComponent,
        canActivate: [AuthGuard],
        resolve: {
          furnitureDetails: FurnitureDetailsResolver,
        }
      },
      {
        path: 'delete/:id',
        component: DeleteFurnitureComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit/:id',
        component: EditFurnitureComponent,
        canActivate: [AuthGuard],
        resolve: {
          furniture: FurnitureEditResolver,
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

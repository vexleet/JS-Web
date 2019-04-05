import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { CreateFurnitureComponent } from './create-furniture/create-furniture.component';
import { UserFurnitureComponent } from './user-furniture/user-furniture.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FurnitureDetailsComponent } from './furniture-details/furniture-details.component';
import { DeleteFurnitureComponent } from './delete-furniture/delete-furniture.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CreateFurnitureComponent,
    UserFurnitureComponent,
    RegisterComponent,
    LoginComponent,
    FurnitureDetailsComponent,
    DeleteFurnitureComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

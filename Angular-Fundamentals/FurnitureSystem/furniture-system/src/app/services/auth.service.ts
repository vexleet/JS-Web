import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(email: string, name: string, password: string) {
    //TODO: Make Interface 

    return this.http.post<any>('auth/register', { email, name, password });
  }

  login(email: string, password: string) {
    //TODO: Make Interface

    return this.http.post<any>('auth/login', { email, password });
  }

  setCredentials(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user.name);
  }
}

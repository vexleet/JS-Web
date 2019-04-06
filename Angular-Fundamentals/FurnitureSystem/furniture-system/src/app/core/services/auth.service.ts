import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(email: string, name: string, password: string) {
    return this.http.post('auth/register', { email, name, password });
  }

  login(email: string, password: string) {
    return this.http.post('auth/login', { email, password });
  }

  setCredentials(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user.name);
    localStorage.setItem('isAdmin', data.user.isAdmin);
  }

  clearStorage() {
    localStorage.clear();
  }

  get isLoggedIn() {
    return localStorage.getItem('token') === null;
  }

  get token() {
    return localStorage.getItem('token');
  }

  get isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
  }
}

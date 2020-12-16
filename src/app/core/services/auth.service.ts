import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlModule = 'auth';
  redirectUrl: string;
  currentPage: number;
  user = sessionStorage.getItem('bidbuba-user');
  userObject$  = new BehaviorSubject<any>(JSON.parse(this.user) || null);
  constructor(private http: HttpClient, private router: Router) { }

  storeToken(token: string) {
    return sessionStorage.setItem('bidbuba-access-token', token);
  }

  getToken() {
    return sessionStorage.getItem('bidbuba-access-token');
  }

  storeUser(user: any) {
    sessionStorage.setItem('bidbuba-user', JSON.stringify(user));
    return this.userObject$.next(user);
  }

  getUser$() {
    return this.userObject$.asObservable();
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  async clearSessionStorage() {
    await sessionStorage.clear();
  }

  login(user) {
    return this.http.post(`${environment.bubaApi}/admin/account/login`, user).pipe(catchError((error) => throwError(error)));
  }

 fetchDashboard() {
  return this.http.get(`${environment.bubaApi}/dashboard`).pipe(catchError((error) => throwError(error)));
  }
}

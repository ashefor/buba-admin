import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  fetchUsers(pageDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/users/list`, pageDetails).pipe(catchError((error) => throwError(error)));
  }

  fetchUserDetails(userDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/users/one`, userDetails).pipe(catchError((error) => throwError(error)));
  }

  changeUserStatus(authid, type) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/users/${type}`, authid).pipe(catchError((error) => throwError(error)));
  }

  fundUserAccount(fundObject) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/users/fund/add`, fundObject).pipe(catchError((error) => throwError(error)));
  }

  editUser(userDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/users/edit`, userDetails).pipe(catchError((error) => throwError(error)));
  }
}

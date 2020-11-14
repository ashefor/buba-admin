import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  fetchSystemUsers(pageDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/${environment.module}/account/list`, pageDetails).pipe(catchError((error) => throwError(error)));
  }

  fetchSingleSystemUser(userDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/${environment.module}/account/one`, userDetails).pipe(catchError((error) => throwError(error)));
  }

  addSingleSystemUser(userDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/${environment.module}/account/create`, userDetails).pipe(catchError((error) => throwError(error)));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getUsersReport(pageDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/report/users`, pageDetails).pipe(catchError((error) => throwError(error)));
  }

  getActivityReport(pageDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/report/users/activity`, pageDetails).pipe(catchError((error) => throwError(error)));
  }

  getFundingReport(pageDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/report/funding`, pageDetails).pipe(catchError((error) => throwError(error)));
  }

  getZeroFundingReport(pageDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/report/funding/zero`, pageDetails).pipe(catchError((error) => throwError(error)));
  }
}

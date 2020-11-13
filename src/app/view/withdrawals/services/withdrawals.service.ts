import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalsService {

  constructor(private http: HttpClient) { }

  fetchWithdrawals(pageDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/${environment.module}/withdrawal/list`, pageDetails).pipe(catchError((error) => throwError(error)));
  }
}

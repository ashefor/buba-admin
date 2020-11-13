import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FundingService {

  constructor(private http: HttpClient) { }

  fetchFundings(pageDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/${environment.module}/transactions/list`, pageDetails).pipe(catchError((error) => throwError(error)));
  }
}

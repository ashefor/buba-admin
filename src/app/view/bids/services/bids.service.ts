import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidsService {

  constructor(private http: HttpClient) { }

  fetchBidHistory(pageDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/${environment.module}/bid/history`, pageDetails).pipe(catchError((error) => throwError(error)));
  }

  fetchBidDetails(bidDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/${environment.module}/bid/submission`, bidDetails).pipe(catchError((error) => throwError(error)));
  }
}

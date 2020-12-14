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

  fetchBidsLists(pageDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/bid_list/list`, pageDetails).pipe(catchError((error) => throwError(error)));
  }

  deleteBidsList(id) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/bid_list/delete`, id).pipe(catchError((error) => throwError(error)));
  }

  editBidsList(singleBid) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/bid_list/edit`, singleBid).pipe(catchError((error) => throwError(error)));
  }

  fetchBidDetails(bidDetails) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${environment.bubaApi}/${environment.module}/bid/submission`, bidDetails).pipe(catchError((error) => throwError(error)));
  }

  uploadBidsToServer(bids) {
    // tslint:disable-next-line: max-line-length
    const body = JSON.stringify(bids);
    return this.http.post(`${environment.bubaApi}/bids/upload`, body).pipe(catchError((error) => throwError(error)));
  }
}

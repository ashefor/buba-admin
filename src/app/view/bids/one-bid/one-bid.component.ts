import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { BidsService } from '../services/bids.service';

@Component({
  selector: 'app-one-bid',
  templateUrl: './one-bid.component.html',
  styleUrls: ['./one-bid.component.scss']
})
export class OneBidComponent implements OnInit, OnDestroy {
  bidId: any;
  bidDetails: any;
  bidEntry: any[];
  constructor(private activatedRoute: ActivatedRoute,
              private service: BidsService, private loadingBar: LoadingBarService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.bidId = param.id;
      this.fetchBidDetails();
    });
  }

  ngOnDestroy() {
    this.loadingBar.stop();
  }

  fetchBidDetails() {
    const user = {
      bid_id: this.bidId
    };
    this.loadingBar.start();
    this.service.fetchBidDetails(user).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      this.bidDetails = data;
      this.bidEntry = data.last_entry;
      // this.user = data.user;
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.loadingBar.stop();
      if (error.status !== 401 && (error.status >= 400 && error.status <= 415)) {
        this.toastr.error(error.error.message, 'Error');
      } else if (error.status > 415) {
        this.toastr.error('An error has occured. Please try again later', 'Error');
      }
    });
  }

}

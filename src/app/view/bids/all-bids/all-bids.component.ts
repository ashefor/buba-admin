import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { pageSizes } from '../../shared/models/page-sizes';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { BidsService } from '../services/bids.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-bids',
  templateUrl: './all-bids.component.html',
  styleUrls: ['./all-bids.component.scss']
})
export class AllBidsComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  bidHistory: any[];
  pageNumber = 1;
  pageSize = { size: '10', value: '10' };
  pageSizes = pageSizes;
  status: any;
  searchText = '';
  errorMsg = 'no bids yet';

  constructor(private activatedRoute: ActivatedRoute,
              private service: BidsService, private loadingBar: LoadingBarService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.status = param.id;
      this.bidHistory = null;
      this.pageSize = { size: '10', value: '10' };
      this.fetchAllBids();
    });
    this.httpSearch();
  }

  ngOnDestroy() {
    this.loadingBar.stop();
  }
  fetchAllBids(searchText = '') {
    const pageDetails = {
      page_size: this.pageSize.value,
      search_text: searchText,
      status: this.status,
      page_number: this.pageNumber
    };
    this.loadingBar.start();
    console.log(pageDetails);
    this.service.fetchBidHistory(pageDetails).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      this.bidHistory = data.bids_history;
      console.log(this.bidHistory);
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

  httpSearch() {
    // tslint:disable-next-line: max-line-length
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value),
      debounceTime(500),
      distinctUntilChanged()).subscribe((text: any) => {
        this.searchText = text;
        this.fetchAllBids(text);
      });
  }

  changePageSize(event) {
    this.pageSize = event;
    this.fetchAllBids();
  }

  goToAnotherPage() {
    const pageDetails = {
      page_size: this.pageSize.value,
      search_text: this.searchText,
      status: this.status,
      page_number: this.pageNumber
    };
    this.loadingBar.start();
    console.log(pageDetails);
    this.service.fetchBidHistory(pageDetails).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      this.bidHistory = data.bids_history;
      console.log(this.bidHistory);
      if (!this.bidHistory.length) {
        this.errorMsg = 'no more results';
      }
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

  goPrevious() {
    if (this.pageNumber === 1) {
      return;
    } else {
      this.pageNumber -= 1;
      this.goToAnotherPage();
    }
  }

  goNext() {
    this.pageNumber += 1;
    this.goToAnotherPage();
  }
}

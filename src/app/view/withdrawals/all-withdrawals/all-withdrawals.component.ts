import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { pageSizes } from '../../shared/models/page-sizes';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { WithdrawalsService } from '../services/withdrawals.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-withdrawals',
  templateUrl: './all-withdrawals.component.html',
  styleUrls: ['./all-withdrawals.component.scss']
})
export class AllWithdrawalsComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  withdrawalHistory: any[];
  pageNumber = 1;
  pageSize = { size: '10', value: '10' };
  pageSizes = pageSizes;
  searchText = '';
  errorMsg = 'no withdrawals yet';

  constructor(private service: WithdrawalsService, private loadingBar: LoadingBarService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchAllWithdrawals();
    this.httpSearch();
  }

  ngOnDestroy() {
    this.loadingBar.stop();
  }

  fetchAllWithdrawals(searchText = '') {
    const pageDetails = {
      page_size: this.pageSize.value,
      search_text: searchText,
      page_number: this.pageNumber
    };
    this.loadingBar.start();
    console.log(pageDetails);
    this.service.fetchWithdrawals(pageDetails).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      this.withdrawalHistory = data.withdrawals;
      console.log(this.withdrawalHistory);
      // if (data.status === 'success') {
      //   this.usersHistory = data.users;
      //   console.log(this.usersHistory);
      // }
    },  (error: HttpErrorResponse) => {
      console.log(error);
      this.loadingBar.stop();
      if (error.status >= 400 && error.status <= 415 && error.status !== 401) {
        this.toastr.error(error.error.message, 'Error');
      } else {
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
        this.fetchAllWithdrawals(text);
      });
  }

  changePageSize(event) {
    this.pageSize = event;
    this.fetchAllWithdrawals();
  }

  goToAnotherPage() {
    const pageDetails = {
      page_size: this.pageSize.value,
      search_text: this.searchText,
      page_number: this.pageNumber
    };
    this.loadingBar.start();
    console.log(pageDetails);
    this.service.fetchWithdrawals(pageDetails).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      this.withdrawalHistory = data.withdrawals;
      console.log(this.withdrawalHistory);
      if (!this.withdrawalHistory.length) {
        this.errorMsg = 'no more results';
      }
    },  (error: HttpErrorResponse) => {
      console.log(error);
      this.loadingBar.stop();
      if (error.status >= 400 && error.status <= 415 && error.status !== 401) {
        this.toastr.error(error.error.message, 'Error');
      } else {
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

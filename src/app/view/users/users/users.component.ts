import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { pageSizes } from '../../shared/models/page-sizes';
import { UsersService } from '../services/users.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  usersHistory: any[];
  pageNumber = 1;
  pageSize = { size: '10', value: '10' };
  pageSizes = pageSizes;
  searchText = '';
  errorMsg = 'no users yet';
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private service: UsersService, private loadingBar: LoadingBarService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.httpSearch();
  }

  ngOnDestroy() {
    this.loadingBar.stop();
  }

  fetchUsers(searchText = '') {
    const pageDetails = {
      page_size: this.pageSize.value,
      search_text: searchText,
      page_number: this.pageNumber
    };
    this.loadingBar.start();
    console.log(pageDetails);
    this.service.fetchUsers(pageDetails).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      this.usersHistory = data.users;
      console.log(this.usersHistory);
      // if (data.status === 'success') {
      //   this.usersHistory = data.users;
      //   console.log(this.usersHistory);
      // }
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
        this.fetchUsers(text);
      });
  }

  changePageSize(event) {
    this.pageSize = event;
    this.fetchUsers();
  }

  goToAnotherPage() {
    const pageDetails = {
      page_size: this.pageSize.value,
      search_text: this.searchText,
      page_number: this.pageNumber
    };
    this.loadingBar.start();
    console.log(pageDetails);
    this.service.fetchUsers(pageDetails).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      this.usersHistory = data.users;
      console.log(this.usersHistory);
      if (!this.usersHistory.length) {
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

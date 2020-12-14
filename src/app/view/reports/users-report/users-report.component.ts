import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-users-report',
  templateUrl: './users-report.component.html',
  styleUrls: ['./users-report.component.scss']
})
export class UsersReportComponent implements OnInit, OnDestroy {
  reportHistory: any[];
  startDate: any;
  endDate: any;
  isFetching: boolean;
  constructor(private service: ReportService, private loadingBar: LoadingBarService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.loadingBar.stop();
  }
  getReport() {
    if (!this.startDate || !this.endDate) {
      return this.toastr.error('Select start and end dates');
    }
    const dataObj = {
      from_date: this.startDate,
      to_date: this.endDate,
    };
    console.log(dataObj);
    this.loadingBar.start();
    this.isFetching = true;
    this.service.getUsersReport(dataObj).subscribe((data: any) => {
      console.log(data);
      this.loadingBar.stop();
      this.isFetching = false;
      if (data.status === 'success') {
        this.reportHistory = data.users;
      } else {
        this.toastr.error(data.message);
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.loadingBar.stop();
      this.isFetching = false;
      if (error.status !== 401 && (error.status >= 400 && error.status <= 415)) {
        this.toastr.error(error.error.message, 'Error');
      } else if (error.status > 415) {
        this.toastr.error('An error has occured. Please try again later', 'Error');
      }
    });

  }

  goToAnotherPage() {
    
  }
}

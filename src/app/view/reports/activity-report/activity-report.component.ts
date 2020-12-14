import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.scss']
})
export class ActivityReportComponent implements OnInit, OnDestroy {
  reportHistory: any[];
  startDate: any;
  isFetching: boolean;
  constructor(private service: ReportService, private loadingBar: LoadingBarService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.loadingBar.stop();
  }
  getReport() {
    if (!this.startDate) {
      return this.toastr.error('Select a date');
    }
    const dataObj = {
      date: this.startDate,
    };
    console.log(dataObj);
    this.loadingBar.start();
    this.isFetching = true;
    this.service.getActivityReport(dataObj).subscribe((data: any) => {
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

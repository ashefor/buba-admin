import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/core/services/excel.service';
import { ReportService } from '../reports/services/report.service';

@Component({
  selector: 'app-zero-funding',
  templateUrl: './zero-funding.component.html',
  styleUrls: ['./zero-funding.component.scss']
})
export class ZeroFundingComponent implements OnInit {
  fundingHistory: any[];
  reportFundedHistory: any[];
  from_date: any;
  to_date: any;
  isFetching: boolean;
  reports: any;
  allReports: any[][];
  constructor(private service: ReportService, private loadingBar: LoadingBarService, private toastr: ToastrService, private excelservice: ExcelService, private titleCase: TitleCasePipe, private lowercase: LowerCasePipe) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.loadingBar.stop();
  }

  getReport() {
    if (!this.from_date || !this.to_date) {
      return this.toastr.error('Select start and end dates');
    }
    const dataObj = {
      from_date: this.from_date,
      to_date: this.to_date
    };
    console.log(dataObj);
    this.loadingBar.start();
    this.isFetching = true;
    this.service.getZeroFundingReport(dataObj).subscribe((data: any) => {
      console.log(data);
      this.reports = data;
      this.loadingBar.stop();
      this.isFetching = false;
      if (data.status === 'success') {
        this.fundingHistory = data.report;
        this.reportFundedHistory = data.report_funded;
        this.allReports = [this.fundingHistory, this.reportFundedHistory];
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



  exportAsXLSX() {
    const headers: any = [
      [
        { header: "First Name", key: 'firstname', width: 20 },
        { header: 'Last Name', key: 'lastname', width: 20 },
        { header: 'Date Created', key: 'created_at', width: 20 },
        { header: 'Phone Number', key: 'phone_number', width: 20 },
        { header: 'Email', key: 'email', width: 20 },
      ],
      [
        { header: "First Name", key: 'firstname', width: 20 },
        { header: 'Last Name', key: 'lastname', width: 20 },
        { header: 'Date Created', key: 'created_at', width: 20 },
        { header: 'Phone Number', key: 'phone_number', width: 20 },
        { header: 'Email', key: 'email', width: 20 },
      ]
    ];
    this.excelservice.generateMultipleExcel(headers, this.allReports,
      ['Report One', 'Report Two'], 'Zero Funding Report');
  }
}

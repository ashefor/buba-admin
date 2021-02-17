import { CurrencyPipe, DatePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/core/services/excel.service';
import { ReportService } from '../services/report.service';
@Component({
  selector: 'app-funding-report',
  templateUrl: './funding-report.component.html',
  styleUrls: ['./funding-report.component.scss']
})
export class FundingReportComponent implements OnInit, OnDestroy {
  reportHistory: any[];
  startDate: any;
  isFetching: boolean;
  sumTotal: any;
  constructor(private service: ReportService, private loadingBar: LoadingBarService, private toastr: ToastrService,private excelservice: ExcelService, private titleCase: TitleCasePipe, private lowercase: LowerCasePipe, private datePipe: DatePipe, private currencyPipe: CurrencyPipe) { }

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
    this.service.getFundingReport(dataObj).subscribe((data: any) => {
      console.log(data);
      this.loadingBar.stop();
      this.isFetching = false;
      if (data.status === 'success') {
        this.reportHistory = data.report;
        this.getSumTotal(data.report);
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
    let data: any = [];
    let header: any = [
      { header: "First Name", key: 'firstname', width: 20 },
      { header: 'Last Name', key: 'lastname', width: 20 },
      { header: 'Date Created', key: 'created_at', width: 20 },
      { header: 'Email', key: 'email', width: 40 },
      { header: 'Amount', key: 'amount', width: 20 },
      { header: 'Transaction Date', key: 'funding_created_at', width: 20 },
    ];

    data = this.reportHistory.map(item => {
      return {
        firstname: this.titleCase.transform(item.firstname),
        lastname: this.titleCase.transform(item.lastname),
        created_at: this.datePipe.transform(item.user_created_at),
        email: this.lowercase.transform(item.email),
        amount: item.amount,
        funding_created_at: this.datePipe.transform(item.funding_created_at),
      }
    }
    );
    this.excelservice.generateExcel(header, data, 'Funding Report');
  }

  getSumTotal(data: any[]) {
   return this.sumTotal = data.reduce((acc, {amount}) => acc + parseFloat(amount), 0);
  }
}

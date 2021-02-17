import { TitleCasePipe, LowerCasePipe, DatePipe, CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/core/services/excel.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-revenue-reports',
  templateUrl: './revenue-reports.component.html',
  styleUrls: ['./revenue-reports.component.scss']
})
export class RevenueReportsComponent implements OnInit {
  reportHistory: any[];
  bidReports: any[];
  dailySpecialReports: any[];
  quickPlayReports: any[];
  startDate: any;
  isFetching: boolean;
  sumTotal: any;
  allReports: any[][];
  constructor(private service: ReportService, private loadingBar: LoadingBarService, private toastr: ToastrService, private excelservice: ExcelService, private titleCase: TitleCasePipe, private lowercase: LowerCasePipe, private datePipe: DatePipe, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
  }

  getReport() {
    if (!this.startDate) {
      return this.toastr.error('Select a date');
    }
    const splitDate = this.startDate.split('-');
    const dataObj = {
      year: splitDate[0],
      month: splitDate[1]
    };
    console.log(dataObj);
    this.loadingBar.start();
    this.isFetching = true;
    this.service.getRevenueReport(dataObj).subscribe((data: any) => {
      console.log(data);
      this.loadingBar.stop();
      this.isFetching = false;
      if (data.status === 'success') {
        this.reportHistory = data;
        this.bidReports = data.bid_report;
        this.dailySpecialReports = data.daily_special_report;
        this.quickPlayReports = data.quick_play_report;
        this.allReports = [this.bidReports, this.dailySpecialReports, this.quickPlayReports];
        // this.getSumTotal(data.report);
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

  getSumTotal(data: any[]) {
    const totalRevenue = data.reduce((acc, { total_revenue }) => acc + parseFloat(total_revenue), 0);
    const totalActualRevenue = data.reduce((acc, { actual_revenue }) => acc + parseFloat(actual_revenue), 0);
    return {
      totalRevenue,
      totalActualRevenue
    };
  }

  exportAsXLSX() {
    const headers: any = [
      [
        { header: 'Product Name', key: 'product_name', width: 40 },
        { header: 'Date Completed', key: 'date_completed', width: 20 },
        { header: 'Total Bids', key: 'total_bids', width: 20 },
        { header: 'Actual Revenue', key: 'actual_revenue', width: 20 },
        { header: 'Total Revenue', key: 'total_revenue', width: 20 },
      ],
      [
        { header: 'Date Completed', key: 'date_completed', width: 30 },
        { header: 'Actual Revenue', key: 'actual_revenue', width: 20 },
        { header: 'Total Revenue', key: 'total_revenue', width: 20 },
        { header: 'Won', key: 'won', width: 20 }
      ],
      [
        { header: 'Date Completed', key: 'date_completed', width: 30 },
        { header: 'Actual Revenue', key: 'actual_revenue', width: 20 },
        { header: 'Total Revenue', key: 'total_revenue', width: 20 },
        { header: 'Won', key: 'won', width: 20 }
      ]
    ];
    this.excelservice.generateMultipleExcel(headers, this.allReports,
      ['Bid Report', 'Daily Special Report', 'QuickPlay Report'], 'Revenue Report');
  }

  getAllTotalSummmary() {
    const data = this.bidReports.concat(this.dailySpecialReports, this.quickPlayReports)
    const allActualRevenue = data.reduce((acc, {actual_revenue}) => acc + parseFloat(actual_revenue), 0)
    const allTotalRevenue = data.reduce((acc, {total_revenue}) => acc + parseFloat(total_revenue), 0)
    return {
      allActualRevenue,
      allTotalRevenue
    };
  }
}

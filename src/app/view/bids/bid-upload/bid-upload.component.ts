import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'ts-xlsx';
import { BidsService } from '../services/bids.service';

@Component({
  selector: 'app-bid-upload',
  templateUrl: './bid-upload.component.html',
  styleUrls: ['./bid-upload.component.scss']
})
export class BidUploadComponent implements OnInit {
  bidsUpload: any[] = [];
  arrayBuffer: any;
  fileSelected: File;
  filename: string;
  displayModal: boolean;
  constructor(private service: BidsService, private loadingBar: LoadingBarService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showUploadModal() {
    this.displayModal = true;
  }
  onChangeFile($event: any): void {
    this.fileSelected = $event.target.files[0];
    this.filename = this.fileSelected.name;
    console.log(this.fileSelected);
  }
  
  uploadFile(file : HTMLInputElement) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      const param = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      // $('#import').modal('hide');
      console.log(param);
      this.bidsUpload = param;
      console.log(file);
      file.value = '';
      this.fileSelected = null;
      this.filename = null;
      this.displayModal = false;

    };
    fileReader.readAsArrayBuffer(this.fileSelected);
  }

  uploadBids() {
    const bids = {
      data: this.bidsUpload
    };
    console.log(bids);
    this.loadingBar.start();
    this.service.uploadBidsToServer(this.bidsUpload).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      if(data.status === 'success') {
        this.toastr.success('Uploaded successfully');
        location.reload();
      }
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

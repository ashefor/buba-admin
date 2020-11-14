import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit, OnDestroy {
  userId: any;
  user: any;
  userDetails: any;
  editModal: boolean;
  fundModal: boolean;
  fundForm: FormGroup;
  editForm: FormGroup;
  isFunding: boolean;
  fundingHistory: any[] = [];
  bidsHistory: any[] = [];
  isEditting: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private service: UsersService,
              private loadingBar: LoadingBarService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.userId = param.id;
      this.fetchUserDetails();
    });
    this.initFundForm();
    this.initEditForm();
  }
  ngOnDestroy() {
    this.loadingBar.stop();
  }
  initFundForm() {
    this.fundForm = this.fb.group({
      amount: [null, Validators.required]
    });
  }
  initEditForm() {
    this.editForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      phone_number: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
  }
  get fundformControls() {
    return this.fundForm.controls;
  }

  get editformControls() {
    return this.editForm.controls;
  }

  fetchUserDetails() {
    const user = {
      authid: this.userId
    };
    this.loadingBar.start();
    this.service.fetchUserDetails(user).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      this.userDetails = data;
      this.user = data.user;
      this.fundingHistory = data.funding_transactions;
      this.bidsHistory = data.bids_submission;
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.loadingBar.stop();
      if (error.status >= 400 && error.status <= 415 && error.status !== 401) {
        this.toastr.error(error.error.message, 'Error');
      } else {
        this.toastr.error('An error has occured. Please try again later', 'Error');
      }
    });
  }

  activateUser() {
    if (confirm('Activate this user?')) {
      this.changeStatus('activate');
    }
  }

  deactivateUser() {
    if (confirm('Deactivate this user?')) {
      this.changeStatus('deactivate');
    }
  }

  changeStatus(status) {
    const userObj = {
      authid: this.userId
    };
    this.loadingBar.start();
    this.service.changeUserStatus(userObj, status).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      if (data.status === 'success') {
        this.toastr.success(data.message);
        location.reload();
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.loadingBar.stop();
      if (error.status >= 400 && error.status <= 415 && error.status !== 401) {
        this.toastr.error(error.error.message, 'Error');
      } else {
        this.toastr.error('An error has occured. Please try again later', 'Error');
      }
    });
  }

  showFundModalDialog() {
    this.fundModal = true;
  }

  showEditModalDialog() {
    this.editModal = true;
    Object.keys(this.editForm.controls).forEach(key => {
      this.editForm.patchValue({
        [key] : this.user[key]
      });
    });
  }
  processFund(formvalue) {
    // tslint:disable-next-line: forin
    for (const i in this.fundForm.controls) {
      this.fundForm.controls[i].markAsDirty();
      this.fundForm.controls[i].updateValueAndValidity();
    }
    if (this.fundForm.invalid) {
      return;
    }
    const fundDetails = {
      amount: formvalue.amount,
      authid: this.userId
    };
    console.log(fundDetails);
    this.loadingBar.start();
    this.isFunding = true;
    this.fundForm.disable();
    this.service.fundUserAccount(fundDetails).subscribe((data: any) => {
      this.loadingBar.stop();
      this.fundForm.enable();
      this.isFunding = false;
      console.log(data);
      if (data.status === 'success') {
        this.toastr.success(data.message);
        this.fundModal = false;
        this.fundForm.reset();
        location.reload();
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.loadingBar.stop();
      if (error.status >= 400 && error.status <= 415 && error.status !== 401) {
        this.toastr.error(error.error.message, 'Error');
      } else {
        this.toastr.error('An error has occured. Please try again later', 'Error');
      }
    });
  }

  closeModal() {
    this.fundForm.reset();
  }

  processEdit(formvalue) {
    // tslint:disable-next-line: forin
    for (const i in this.editForm.controls) {
      this.editForm.controls[i].markAsDirty();
      this.editForm.controls[i].updateValueAndValidity();
    }
    if (this.editForm.invalid) {
      return;
    }
    formvalue.authid = this.userId;
    console.log(formvalue);
    this.loadingBar.start();
    this.isEditting = true;
    this.editForm.disable();
    this.service.editUser(formvalue).subscribe((data: any) => {
      this.loadingBar.stop();
      this.editForm.enable();
      this.isEditting = false;
      if (data.status === 'success') {
        this.toastr.success(data.message);
        this.editModal = false;
        location.reload();
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
}

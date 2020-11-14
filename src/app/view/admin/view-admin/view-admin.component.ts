import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { departments } from '../../shared/models/departments';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.scss']
})
export class ViewAdminComponent implements OnInit, OnDestroy {
  departments = departments;
  permission: any[] = [];
  user: any;
  authId: any;
  constructor(private service: AdminService,
              private activatedRoute: ActivatedRoute, private toastr: ToastrService, private loadingBar: LoadingBarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.authId = param.id;
      this.fetchUserDetails();
    });
  }

  ngOnDestroy() {
    this.loadingBar.stop();
  }
  fetchUserDetails() {
    const userObj = {
      authid: this.authId
    };
    this.loadingBar.start();
    this.service.fetchSingleSystemUser(userObj).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
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
  
  setPermission(evt, value) {
    if (evt.checked) {
      this.permission.push(value);
    } else {
      const index = this.permission.indexOf(value);
      if (index > -1) {
        this.permission.splice(index, 1);
      }
    }

  }

  getStatus(value) {
    return this.permission.includes(value);
  }
}

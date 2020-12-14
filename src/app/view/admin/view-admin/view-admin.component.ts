import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  isEditting: boolean;
  existingPermissions: any[] = [];
  constructor(private service: AdminService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService, private loadingBar: LoadingBarService, private router: Router) { }

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
      if (data.status === 'success') {
        this.user = data.admin_user;
        // this.permission = data.permissions;
        this.existingPermissions = data.permissions;
        this.getExistingPermissionsPath();
      } else {
        this.toastr.error(data.message);
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

  setPermission(evt, value) {
    console.log(evt);
    console.log(value);
    if (evt.checked) {
      this.permission.push(value);
    } else {
      const index = this.permission.indexOf(value);
      if (index > -1) {
        this.permission.splice(index, 1);
      }
    }
    console.log(this.permission);

  }

  getStatus(value) {
    // const foundItem = this.permission.find(item => item === value);
    // if (foundItem) {
    //   return true;
    // } else {
    //   return false;
    // }
    return this.permission.includes(value);
  }

  getExistingPermissionsPath() {
    this.existingPermissions.forEach((item, index) => {
      this.permission[index] = this.existingPermissions[index].path;
    });
  }
  editUser() {
    const { first_name, last_name, authid, email, department} = this.user;
    const newUser = {
      first_name,
      last_name,
      email,
      authid,
      department,
      permission: this.permission
    };
    console.log(newUser);
    this.loadingBar.start();
    this.isEditting = true;
    this.service.editSystemUser(newUser).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      this.isEditting = false;
      if (data.status === 'success') {
        this.toastr.success(data.message);
        this.router.navigate(['/system-users']);
      } else {
        this.toastr.error(data.message);
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.loadingBar.stop();
      this.isEditting = false;
      if (error.status !== 401 && (error.status >= 400 && error.status <= 415)) {
        this.toastr.error(error.error.message, 'Error');
      } else if (error.status > 415) {
        this.toastr.error('An error has occured. Please try again later', 'Error');
      }
    });

  }
}

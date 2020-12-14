import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { departments } from '../../shared/models/departments';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit, OnDestroy {
  departments = departments;
  permission: any[] = [];
  firstname: any;
  lastname: any;
  email: any;
  password: any;
  department: any;
  isCreating: boolean;
  constructor(private loadingBar: LoadingBarService,
              private service: AdminService,
              private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.loadingBar.stop();
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

  createuser() {
    const user = {
      first_name : this.firstname,
      last_name: this.lastname,
      email: this.email,
      password: this.password,
      department: this.department.value,
      permission: this.permission
    };
    console.log(user);
    this.loadingBar.start();
    this.isCreating = true;
    this.service.addSingleSystemUser(user).subscribe((data: any) => {
      this.loadingBar.stop();
      console.log(data);
      this.isCreating = false;
      if (data.status === 'success') {
        this.toastr.success(data.message);
        this.router.navigate(['/system-users']);
      } else {
        this.toastr.error(data.message);
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.loadingBar.stop();
      this.isCreating = false;
      if (error.status !== 401 && (error.status >= 400 && error.status <= 415)) {
        this.toastr.error(error.error.message, 'Error');
      } else if (error.status > 415) {
        this.toastr.error('An error has occured. Please try again later', 'Error');
      }
    });
 
  }
}

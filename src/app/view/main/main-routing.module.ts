import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [

      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('../users/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'customers/one/:id',
        loadChildren: () => import('../users/view-user/view-user.module').then(m => m.ViewUserModule)
      },
      {
        path: 'funding',
        loadChildren: () => import('../funding/all-funding/all-funding.module').then(m => m.AllFundingModule)
      },
      // {
      //   path: 'funding/one/:id',
      //   loadChildren: () => import('../funding/single-funding/single-funding.module').then(m => m.SingleFundingModule)
      // }
      {
        path: 'withdrawals',
        loadChildren: () => import('../withdrawals/all-withdrawals/all-withdrawals.module').then(m => m.AllWithdrawalsModule)
      },
      {
        path: 'bids/upload',
        loadChildren: () => import('../bids/bid-upload/bid-upload.module').then(m => m.BidUploadModule)
      },
      {
        path: 'bids/lists',
        loadChildren: () => import('../bids/bid-lists/bid-lists.module').then(m => m.BidListsModule)
      },
      {
        path: 'bids/:id',
        loadChildren: () => import('../bids/all-bids/all-bids.module').then(m => m.AllBidsModule)
      },
      {
        path: 'bids/view/:id',
        loadChildren: () => import('../bids/one-bid/one-bid.module').then(m => m.OneBidModule)
      },
      {
        path: 'system-users',
        loadChildren: () => import('../admin/all-admin/all-admin.module').then(m => m.AllAdminModule)
      },
      {
        path: 'system-users/create',
        loadChildren: () => import('../admin/new-admin/new-admin.module').then(m => m.NewAdminModule)
      },
      {
        path: 'system-users/view/:id',
        loadChildren: () => import('../admin/view-admin/view-admin.module').then(m => m.ViewAdminModule)
      },
      {
        path: 'report/users',
        loadChildren: () => import('../reports/users-report/users-report.module').then(m => m.UsersReportModule)
      }, {
        path: 'report/activity',
        loadChildren: () => import('../reports/activity-report/activity-report.module').then(m => m.ActivityReportModule)
      },
      {
        path: 'report/funding',
        loadChildren: () => import('../reports/funding-report/funding-report.module').then(m => m.FundingReportModule)
      },
      {
        path: 'report/funding/zero',
        loadChildren: () => import('../zero-funding/zero-funding.module').then(m => m.ZeroFundingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

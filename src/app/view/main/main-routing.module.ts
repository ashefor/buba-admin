import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'users/one/:id',
        loadChildren: () => import('../users/view-user/view-user.module').then(m => m.ViewUserModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users/users.module').then(m => m.UsersModule)
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
        path: 'bids/:id',
        loadChildren: () => import('../bids/all-bids/all-bids.module').then(m => m.AllBidsModule)
      },
      {
        path: 'bids/view/:id',
        loadChildren: () => import('../bids/one-bid/one-bid.module').then(m => m.OneBidModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

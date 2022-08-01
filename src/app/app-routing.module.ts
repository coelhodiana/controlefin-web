import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/relatorio',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m=>m.DashboardModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    loadChildren: () => import('./core/pages/sign-in/sign-in.module').then(m => m.SignInModule),
  },
  {
    path: 'transacoes',
    loadChildren: () => import('./pages/transactions/transactions.module').then(m=>m.TransactionsModule),
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

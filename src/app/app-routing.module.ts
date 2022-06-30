import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/transacoes/nova-transacao',
    pathMatch: 'full'
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
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m=>m.DashboardModule),
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

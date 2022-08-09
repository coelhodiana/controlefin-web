import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m=>m.DashboardModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'entrar',
    component: SignInComponent
  },
  {
    path: 'cadastro',
    component: SignUpComponent
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

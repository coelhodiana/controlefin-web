import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule),
    pathMatch: 'full'
  },
  {
    path: '/transacoes',
    loadChildren: () => import('./pages/transactions/transactions.module').then(m=>m.TransactionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

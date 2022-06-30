import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { DashboardRoutes } from './dashboard.routing';
import { ChartsComponent } from './dashboard/components/charts/charts.component';
import { TransactionsComponent } from './dashboard/components/transactions/transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutes,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    TransactionsComponent,
    ChartsComponent
  ]
})
export class DashboardModule { }

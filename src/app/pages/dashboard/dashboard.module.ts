import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { ChartsComponent } from './components/charts/charts.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutes,
    HttpClientModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    TransactionsComponent,
    ChartsComponent
  ],
  providers: [
    DatePipe
  ]
})
export class DashboardModule { }

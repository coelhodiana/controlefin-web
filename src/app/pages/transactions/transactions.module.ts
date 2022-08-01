import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { TransactionCreateEditComponent } from './components/transaction-create-edit/transaction-create-edit.component';
import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutes } from './transactions.routing';


@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutes,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    SharedModule

  ],
  declarations: [
    TransactionsComponent,
    TransactionCreateEditComponent
  ],
  providers: [
    CurrencyPipe,
    DatePipe
  ]
})
export class TransactionsModule { }

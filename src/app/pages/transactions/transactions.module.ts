import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TransactionCreateEditComponent } from './components/transaction-create-edit/transaction-create-edit.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionsService } from './services/transactions.service';
import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutes } from './transactions.routing';


@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutes,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [
    TransactionsComponent,
    TransactionsListComponent,
    TransactionCreateEditComponent
  ],
  providers: [
    TransactionsService,
    CurrencyPipe
  ]
})
export class TransactionsModule { }

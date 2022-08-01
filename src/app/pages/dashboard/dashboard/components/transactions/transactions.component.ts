import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Transaction } from '../../../../../shared/interfaces/transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  @Input() transactions!: BehaviorSubject<Transaction[]>;

  transactionsList = new BehaviorSubject<Transaction[]>([]);

  renderedTransactionsList = new BehaviorSubject<Transaction[]>([]);

  activeType = 'todas';

  constructor() {

  }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.transactions.subscribe({
      next: (transactionsResponse: Transaction[]) => {
        this.renderedTransactionsList.next(transactionsResponse);
        this.transactionsList.next(transactionsResponse);
      },
    });
  }

  filterTransactionByType(type: string) {
    return this.transactionsList.value.filter((transaction: any) => {
      return transaction.type === type;
    });
  }

  filterTransactionsList(type: string) {
    this.renderedTransactionsList.next(this.transactionsList.value);
    this.activeType = 'todas';

    if (type !== 'todas') {
      this.activeType = type;
      let listOfType = this.filterTransactionByType(type);

      this.renderedTransactionsList.next(listOfType);
    }
  }
}

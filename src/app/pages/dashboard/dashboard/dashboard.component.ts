import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

import { Transaction } from '../../../shared/interfaces/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selectedMonth = new Date();

  transactionsList = new BehaviorSubject<Transaction[]>([]);

  income = 0;

  total = 0;

  expense = 0;

  investment = 0;

  creditCard = 0;

  constructor(private transactions: TransactionsService) {}

  ngOnInit() {
    this.getTransactionsList();
  }

  getTransactionsList() {
    this.transactions.listTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        this.transactionsList.next(transactions);
        this.calculateTotals();
      },
    });
  }

  filterTransactionByType(type: string) {
    return this.transactionsList.value.filter((transaction: any) => {
      return transaction.type === type;
    });
  }

  calculateTotalOfType(type: string) {
    let filteredTransactions = this.filterTransactionByType(type);

    let inicialValue = 0;

    return filteredTransactions.reduce(
      (prevValue: number, value: Transaction) => prevValue + value.amount,
      inicialValue
    );
  }

  calculateTotals() {
    this.income = this.calculateTotalOfType('entrada');
    this.expense = this.calculateTotalOfType('saída');
    this.investment = this.calculateTotalOfType('investimento');
    this.creditCard = this.calculateTotalOfType('cartão');
  }
}

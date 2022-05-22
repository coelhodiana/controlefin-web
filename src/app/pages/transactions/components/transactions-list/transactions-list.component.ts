import { Component, OnInit } from '@angular/core';

import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit {
  transactionsList: any;

  constructor(private transactions: TransactionsService) {}

  ngOnInit() {
    this.transactions.listTransactions().subscribe({
      next: (transactions: any) => {
        this.transactionsList = transactions;
      },
    });
  }

  delete(id: number) {
    this.transactions.deleteTransaction(id).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/service/toast.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

import { Transaction } from './../../../../shared/interfaces/transaction';


@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit {
  transactionsList!: Transaction[];

  constructor(private transactions: TransactionsService, private router: Router, private toast: ToastService) {}

  ngOnInit() {
    this.getTransactionsList();
  }

  getTransactionsList() {
    this.transactions.listTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        this.transactionsList = transactions.reverse();
      },
    });
  }

  delete(id: string) {
    this.transactions.deleteTransaction(id).subscribe({
      next: () => {
        this.toast.notify('Transação excluída com sucesso...', 'success')
        this.getTransactionsList();
      },
      error: () => {
      this.toast.notify('Não foi possível deletar a transação...', 'error')
      }
    });
  }
}

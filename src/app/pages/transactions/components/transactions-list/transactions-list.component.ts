import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TransactionsService } from '../../services/transactions.service';
import { ToastService } from './../../../../shared/components/toast/service/toast.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit {
  transactionsList: any;

  constructor(private transactions: TransactionsService, private router: Router, private toast: ToastService) {}

  ngOnInit() {
    this.transactions.listTransactions().subscribe({
      next: (transactions: any) => {
        this.transactionsList = transactions.reverse();
      },
    });
  }

  delete(id: number) {
    this.transactions.deleteTransaction(id).subscribe({
      next: () => {
        this.toast.notify('Transação excluída com sucesso...', 'success')
      },
      error: () => {
      this.toast.notify('Não foi possível deletar a transação...', 'error')
      }
    });
  }
}

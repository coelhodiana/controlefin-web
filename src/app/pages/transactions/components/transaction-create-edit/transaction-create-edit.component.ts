import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastService } from './../../../../shared/components/toast/service/toast.service';
import { TransactionsService } from './../../services/transactions.service';

@Component({
  selector: 'app-transaction-create-edit',
  templateUrl: './transaction-create-edit.component.html',
  styleUrls: ['./transaction-create-edit.component.scss'],
})
export class TransactionCreateEditComponent implements OnInit {
  transactionForm: FormGroup;

  transactionId: any;

  constructor(
    private fb: FormBuilder,
    private transactions: TransactionsService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {
    this.transactionForm = this.fb.group({
      id: [null],
      valor: [0, Validators.required],
      descricao: ['', Validators.required],
      tipo: ['', Validators.required],
      data: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.transactionId = this.route.snapshot.params['id'];

    if (this.transactionId) {
      this.loadTransaction(this.transactionId);
    }
  }

  loadTransaction(id: number) {
    this.transactions.getTransaction(id).subscribe({
      next: (transaction) => {
        this.transactionForm.patchValue({
          ...transaction,
        });
      },
    });
  }

  salvarTransacao() {
    if (this.transactionForm.valid) {
      if (this.transactionId) {
        this.transactions.putTransaction(this.transactionForm.value).subscribe({
          next: () => {
            this.toast.notify('Atualizada com sucesso!', 'success');
            this.router.navigate(['/transacoes']);
          },
          error: () => {
            this.toast.notify('Ops! Não foi possível atualizar...', 'error');
          },
        });
      } else {
        this.transactions
          .postTransaction(this.transactionForm.value)
          .subscribe({
            next: () => {this.router.navigate(['/transacoes'])
          this.toast.notify('A transação foi salva com sucesso!', 'success')
        },
        error: () => {
          this.toast.notify('Não foi possível salvar a transação...', 'error')
            },
          });
      }
    }
  }

  cancel() {
    this.router.navigate(['/transacoes']);
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/service/toast.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

@Component({
  selector: 'app-transaction-create-edit',
  templateUrl: './transaction-create-edit.component.html',
  styleUrls: ['./transaction-create-edit.component.scss'],
})
export class TransactionCreateEditComponent implements OnInit {
  transactionForm: FormGroup;

  bulkTransactions: FormGroup

  transactionId: any;

  constructor(
    private fb: FormBuilder,
    private transactions: TransactionsService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private datePipe: DatePipe
  ) {
    const currentDate = this.datePipe.transform(new Date(), "yyyy-MM-dd")

    this.transactionForm = this.fb.group({
      id: [null],
      amount: [null, Validators.required],
      description: ['', Validators.required],
      type: ['saída', Validators.required],
      date: [currentDate, Validators.required]
    });

    this.bulkTransactions = this.fb.group({
      list: []
    })
  }

  ngOnInit() {

    this.transactionId = this.route.snapshot.params['id'];

    if (this.transactionId) {
      this.loadTransaction(this.transactionId);
    }
  }

  loadTransaction(id: string) {
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
    this.router.navigate(['/']);
  }

  salvarBulk() {

    console.log(JSON.parse(this.bulkTransactions.value.list));

    this.transactions.postTransactions(JSON.parse(this.bulkTransactions.value.list));

    this.router.navigate(['/transacoes']);

  }
}

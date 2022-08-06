import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Transaction } from './../../interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  localTransactions: Transaction[] = [];

  constructor(private http: HttpClient) {}

  getTransaction(id: string): Observable<Transaction> {
    const transactions: Transaction[] = JSON.parse(
      localStorage.getItem('transactions')!
    );

    const transaction: Transaction[] = transactions.filter((transaction) => {
      return transaction.id === id;
    });

    return of(transaction[0]);
    // return this.http.get<any>(`http://localhost:3000/transactions/${id}`);
  }

  listTransactions(): Observable<Transaction[]> {
    if (!localStorage.getItem('transactions')) {
      localStorage.setItem(
        'transactions',
        JSON.stringify(this.localTransactions)
      );
    }

    this.localTransactions = JSON.parse(localStorage.getItem('transactions')!);

    return of(this.localTransactions);

    // return this.http.get<any>('http://localhost:3000/transactions');
  }

  postTransaction(transaction: Transaction): Observable<any> {
    transaction.id = Math.random().toString(36).substr(2, 9);

    localStorage.setItem(
      'transactions',
      JSON.stringify([...this.localTransactions, transaction])
    );

    return of('success');
    // return this.http.post<any>(
    //   'http://localhost:3000/transactions',
    //   transaction
    // );
  }

  putTransaction(transaction: Transaction): Observable<any> {
    const transactionToUpdate = this.localTransactions.map(
      (transactionSelected) => {
        if (transactionSelected.id === transaction.id) {
          return (transactionSelected = transaction);
        } else {
          return transactionSelected;
        }
      }
    );

    localStorage.setItem('transactions', JSON.stringify(transactionToUpdate));

    return of(transactionToUpdate);

    // return this.http.put<any>(
    //   `http://localhost:3000/transactions/${transaction.id}`,
    //   transaction
    // );
  }

  deleteTransaction(id: string) {
    const updatedTransactions: Transaction[] = this.localTransactions.filter(
      (transaction) => {
        return transaction.id !== id;
      }
    );

    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

    return of(updatedTransactions);
    // return this.http.delete<number>(`http://localhost:3000/transactions/${id}`);
  }

  postTransactions(transactions: Transaction[]) {
    localStorage.setItem(
      'transactions',
      JSON.stringify([...this.localTransactions, ...transactions])
    );
  }

  postMethod(): Observable<any> {
    const data = {
      value: 123,
      description: 'lanches',
      type: 'investido',
    };
    return this.http.post<any>(
      'https://4i7p3xshu1.execute-api.us-east-1.amazonaws.com/dev/transaction',
      data
    );
  };
};

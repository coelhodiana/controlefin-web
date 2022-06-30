import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getTransaction(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/transactions/${id}`);
  }

  listTransactions(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/transactions');
  }

  postTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3000/transactions',
      transaction
    );
  }

  putTransaction(transaction: any): Observable<any>  {
    return this.http.put<any>(
      `http://localhost:3000/transactions/${transaction.id}`,
      transaction
    );
  }

  deleteTransaction(id: number) {
    return this.http.delete<number>(`http://localhost:3000/transactions/${id}`);
  }
}

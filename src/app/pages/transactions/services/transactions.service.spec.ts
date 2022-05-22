import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TransactionsService } from './transactions.service';

const transactionsMock = {
  transactions: [
    {
      id: 1,
      valor: 10,
      descricao: 'Bolo de pote',
      tipo: 'saída',
    },
    {
      id: 5,
      valor: 42,
      descricao: 'patê de cachorro',
      tipo: 'saída',
    },
  ],
};

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionsService],
    });
    service = TestBed.inject(TransactionsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should call deleteTransaction', () => {
    const serviceSpy = jest.spyOn(service, 'deleteTransaction');

    service.deleteTransaction(1);

    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call getTransaction', () => {
    const serviceSpy = jest.spyOn(service, 'getTransaction');

    service.getTransaction(1);

    expect(service.getTransaction).toHaveBeenCalled();
  });

  it('should call listTransactions', () => {
    const serviceSpy = jest.spyOn(service, 'listTransactions');
    service.listTransactions();
    expect(service.listTransactions).toHaveBeenCalled();
  });

  it('should call postTransaction', () => {
    const serviceSpy = jest.spyOn(service, 'postTransaction');
    service.postTransaction(transactionsMock.transactions[0]);
    expect(service.postTransaction).toHaveBeenCalled();
  });

  it('should call putTransaction', () => {
    const serviceSpy = jest.spyOn(service, 'putTransaction');
    service.putTransaction(transactionsMock.transactions[0]);
    expect(service.putTransaction).toHaveBeenCalled();
  });
});

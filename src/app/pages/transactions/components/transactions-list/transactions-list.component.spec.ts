import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';

import { ToastService } from './../../../../shared/components/toast/service/toast.service';
import { TransactionsService } from './../../services/transactions.service';
import { TransactionsListComponent } from './transactions-list.component';

const transactionsMock: any = [
  {
  "id": 1,
  "valor": 10,
  "descricao": "Bolo de pote",
  "tipo": "saída"
},
{
  "id": 3,
  "valor": 4.5,
  "descricao": "mentos",
  "tipo": "saída"
}
];

class MockTransctionsService {
  listTransactions(): Observable<any> {
    return transactionsMock
  }

  deleteTransaction(id: number) {
    return of(()=>{})
  }
}

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let toast: ToastService;
  let fixture: ComponentFixture<TransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [TransactionsListComponent],
      providers: [
        {provide: TransactionsService, useClass: MockTransctionsService},
        {provide: ToastService, useValue: {notify: ()=>{}}}

      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
    toast = TestBed.inject(ToastService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should list all transactions`, () => {
    const returnMock = [
      {
        id: 1,
        valor: 10,
        descricao: 'Bolo de pote',
        tipo: 'saída',
      },
    ];
    const serviceTransactions = TestBed.inject(TransactionsService);
    const serviceSpy = jest.spyOn(serviceTransactions, 'listTransactions').mockReturnValue(of(returnMock));

    component.ngOnInit();

    expect(serviceSpy).toHaveBeenCalled();
    expect(component.transactionsList).toBe(returnMock);
  });

  it('should delete one transaction', () => {
    const serviceTransactions = TestBed.inject(TransactionsService);
    const serviceSpy = jest.spyOn(serviceTransactions, 'deleteTransaction');
    const toastSpy = jest.spyOn(toast, 'notify');

    component.delete(1);

    expect(serviceSpy).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalled();
  });

  it('should try to delete and return error', () => {
    const serviceTransactions = TestBed.inject(TransactionsService);
    const serviceSpy = jest.spyOn(serviceTransactions, 'deleteTransaction').mockReturnValue(throwError({}));
    const toastSpy = jest.spyOn(toast, 'notify');

    component.delete(1);

    expect(serviceSpy).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalled();
  })

});

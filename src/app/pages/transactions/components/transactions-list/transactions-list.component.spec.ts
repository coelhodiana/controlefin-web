import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

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

  }
}

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TransactionsListComponent],
      providers: [
        {provide: TransactionsService, useClass: MockTransctionsService}
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
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
    const serviceSpy = jest.spyOn(serviceTransactions, 'deleteTransaction').mockReturnValue(of());

    component.delete(1);

    expect(serviceSpy).toHaveBeenCalled();
  })

});

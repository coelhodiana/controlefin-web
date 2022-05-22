import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TransactionsService } from './../../services/transactions.service';
import { TransactionCreateEditComponent } from './transaction-create-edit.component';

const transactionsMock: any = [
  {
    id: 1,
    valor: 10,
    descricao: 'Bolo de pote',
    tipo: 'saída',
  },
  {
    id: 3,
    valor: 4.5,
    descricao: 'mentos',
    tipo: 'saída',
  },
];

class TransactionsServiceMock {
  getTransaction() {
    return of(transactionsMock);
  }

  putTransaction() {
    return jest.fn();
  }

  postTransaction() {
    return jest.fn();
  }
}

describe('TransactionCreateEditComponent', () => {
  let component: TransactionCreateEditComponent;
  let fixture: ComponentFixture<TransactionCreateEditComponent>;
  let service: TransactionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [TransactionCreateEditComponent],
      providers: [
        { provide: TransactionsService, useClass: TransactionsServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 1 } } },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCreateEditComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TransactionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const formMock = {
      id: 1,
      valor: 10,
      descricao: 'Bolo de pote',
      tipo: 'saída',
    };

    component.ngOnInit();

    component.transactionId = 1;

    component.transactionForm.patchValue({ ...formMock });

    expect(component.transactionForm.value).toStrictEqual(formMock);
  });

  it('should call loadTransaction', () => {
    const returnMock = [
      {
        id: 1,
        valor: 10,
        descricao: 'Bolo de pote',
        tipo: 'saída',
      },
    ];

    const serviceSpy = jest
      .spyOn(service, 'getTransaction')
      .mockReturnValue(of(returnMock));

    component.loadTransaction(1);

    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call postTransaction', () => {
    component.transactionId = null;
    const returnMock = [
      {
        id: 1,
        valor: 10,
        descricao: 'Bolo de pote',
        tipo: 'saída',
      },
    ];

    component.transactionForm.patchValue({ ...returnMock[0] });

    const serviceSpy = jest
      .spyOn(service, 'postTransaction')
      .mockReturnValue(of(returnMock));

    component.salvarTransacao();

    expect(component.transactionId).toBeNull();
    expect(component.transactionForm.valid).toBeTruthy();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call putTransaction', () => {
    const returnMock = [
      {
        id: 1,
        valor: 10,
        descricao: 'Bolo de pote',
        tipo: 'saída',
      },
    ];
    component.transactionId = 1;
    component.transactionForm.patchValue({ ...returnMock[0] });

    const servicoSpy = jest
      .spyOn(service, 'putTransaction')
      .mockReturnValue(of(returnMock));

    component.salvarTransacao();

    expect(component.transactionId).toEqual(1);
    expect(component.transactionForm.valid).toBeTruthy();
    expect(servicoSpy).toHaveBeenCalled();
  });
});

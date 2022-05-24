import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { ToastService } from './../../../../shared/components/toast/service/toast.service';
import { TransactionsService } from './../../services/transactions.service';
import { TransactionsComponent } from './../../transactions.component';
import { TransactionCreateEditComponent } from './transaction-create-edit.component';

const transactionsMock: any = [
  {
    id: 1,
    valor: 10,
    descricao: 'Bolo de pote',
    tipo: 'saída',
    data: '2022-05-23',
  },
  {
    id: 3,
    valor: 4.5,
    descricao: 'mentos',
    tipo: 'saída',
    data: '2022-05-23',
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
  let toast: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'transacoes',
            component: TransactionsComponent
          }
        ]),
        HttpClientTestingModule,
      ],
      declarations: [TransactionCreateEditComponent],
      providers: [
        { provide: TransactionsService, useClass: TransactionsServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 1 } } },
        },
        {
          provide: ToastService, useValue: {notify: ()=>{}}
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCreateEditComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TransactionsService);
    toast = TestBed.inject(ToastService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();

    component.transactionId = 1;

    component.transactionForm.patchValue({ ...transactionsMock[0] });

    expect(component.transactionForm.value).toStrictEqual(transactionsMock[0]);
  });

  it('should call loadTransaction', () => {
    const serviceSpy = jest
      .spyOn(service, 'getTransaction')
      .mockReturnValue(of(transactionsMock[0]));

    component.loadTransaction(1);

    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call postTransaction', () => {
    component.transactionId = null;

    component.transactionForm.patchValue({ ...transactionsMock[0] });

    const serviceSpy = jest
      .spyOn(service, 'postTransaction')
      .mockReturnValue(of(transactionsMock[0]));

    component.salvarTransacao();

    expect(component.transactionId).toBeNull();
    expect(component.transactionForm.valid).toBeTruthy();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call postTransaction with error', () => {
    component.transactionId = null;

    component.transactionForm.patchValue({ ...transactionsMock[0] });

    const serviceSpy = jest
      .spyOn(service, 'postTransaction')
      .mockReturnValue(throwError({}));

    component.salvarTransacao();

    expect(component.transactionId).toBeNull();
    expect(component.transactionForm.valid).toBeTruthy();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should call putTransaction', () => {
    component.transactionId = 1;
    component.transactionForm.patchValue({ ...transactionsMock[0] });

    const toastSpy = jest.spyOn(toast, 'notify');

    const servicoSpy = jest
      .spyOn(service, 'putTransaction')
      .mockReturnValue(of(transactionsMock[0]));

    component.salvarTransacao();

    expect(component.transactionId).toEqual(1);
    expect(component.transactionForm.valid).toBeTruthy();
    expect(servicoSpy).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalled();
  });

  it('should call putTransaction with error', () => {
    component.transactionId = 1;
    component.transactionForm.patchValue({ ...transactionsMock[0] });

    const toastSpy = jest.spyOn(toast, 'notify');

    const servicoSpy = jest
      .spyOn(service, 'putTransaction')
      .mockReturnValue(throwError({}));

    component.salvarTransacao();

    expect(component.transactionId).toEqual(1);
    expect(component.transactionForm.valid).toBeTruthy();
    expect(servicoSpy).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalled();
  });

  it('Should call cancel', () => {
    const routerMock = TestBed.inject(Router)
    const routeSpy = jest.spyOn(routerMock, 'navigate').mockResolvedValue(true);
    // const cancelSpy = jest.spyOn(component, 'cancel');

    component.cancel();

    // expect(cancelSpy).toHaveBeenCalled();
    expect(routeSpy).toHaveBeenCalled();
  });
});

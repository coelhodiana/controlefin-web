import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Toast } from './../model/toast';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`Should call getNotifications`, () => {
    const servicoSpy = jest.spyOn(service, 'getNotifications');

    service.getNotifications();

    expect(service.getNotifications).toHaveBeenCalled();
  });

  it(`Should call notify`, () => {
    const serviceSpy = jest.spyOn(service, 'notify');

    service.notify('Mensagem', 'success');

    expect(serviceSpy).toHaveBeenCalled();
  });

  it(`Should call notify with durantion value`, fakeAsync(() => {
    const objNotificationMock: Toast = {
      message: 'Mensagem',
      type: { type: 'success', icon: 'bi bi-check-lg' },
      duration: 16,
    };

    const serviceSpy = jest.spyOn(service, 'notify');
    const serviceDismissSpy = jest.spyOn(service, 'dismiss');



    service.notify('Mensagem', 'success', 16)

    tick(objNotificationMock.duration! * 1000);

    service.dismiss({
      message: 'Mensagem',
      type: { type: 'success', icon: 'bi bi-check-lg' },
      duration: 16,
    });

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceDismissSpy).toHaveBeenCalled();

  }));

  it(`Should call dismiss`, () => {
    const serviceSpy = jest.spyOn(service, 'dismiss');

    service.dismiss({
      message: 'Mensagem',
      type: { type: 'success', icon: 'bi bi-check-lg' },
      duration: 8,
    });

    expect(serviceSpy).toHaveBeenCalled();
  });

  it(`Should call dismissAll`, () => {
    const serviceSpy = jest.spyOn(service, 'dismissAll');

    service.dismissAll();

    expect(serviceSpy).toHaveBeenCalled();
  });
});

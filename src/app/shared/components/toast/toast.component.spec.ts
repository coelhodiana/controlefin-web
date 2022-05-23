import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { ToastService } from './service/toast.service';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toast: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    toast = TestBed.inject(ToastService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show new toast', () => {
    toast.notify('mensagem', 'success');

    expect(component.notifications.length).toEqual(1);
  });

  it('Should show remove toast', () => {
    toast.notify('mensagem', 'success');

    expect(component.notifications.length).toEqual(1);
    component.dismiss(component.notifications[0]);
    expect(component.notifications.length).toEqual(0);
  });

  it('Should call dismiss', () => {
    const dismissServiceSpy = jest.spyOn(toast, 'dismiss');

    component.dismiss({
      message: 'Mensagem',
      type: { type: 'success', icon: 'bi bi-check-lg' },
      duration: 8,
    });

    expect(dismissServiceSpy).toHaveBeenCalled();
  });

  it('Should destroy subscriptions', () => {
    component.subscription = new Subscription();

    const spy = jest.spyOn(Subscription.prototype, 'unsubscribe');

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
    expect(Subscription.prototype.unsubscribe).toHaveBeenCalledTimes(1);
  });
});

import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';

import { Toast, ToastAction } from './../model/toast';
import { TypeList } from './../util/types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  notifications = new Subject<ToastAction>();

  getNotifications(): Observable<ToastAction> {
    return this.notifications.asObservable();
  }

  notify(message: string, type: string, duration: number = 8) {
    const objNotification: Toast = {
      message,
      duration,
      type: TypeList[type],
    };

    this.notifications.next({
      action: 'new',
      notification: objNotification,
    });

    if (objNotification.duration) {
      timer(objNotification.duration * 1000).subscribe({
        next: () => {
          this.dismiss(objNotification);
        },
      });
    }
  }

  dismiss(notification: Toast) {
    this.notifications.next({
      action: 'dismiss',
      notification,
    });
  }

  dismissAll() {
    this.notifications.next({
      action: 'dismiss-all',
    });
  }
}

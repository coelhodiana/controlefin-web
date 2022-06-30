import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Toast, ToastAction } from './model/toast';
import { ToastService } from './service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnDestroy {
  notifications: Toast[] = [];

  subscription: Subscription;

  constructor(private toast: ToastService) {
    this.subscription = this.toast.getNotifications().subscribe((notificationAction: ToastAction) => {
      switch (notificationAction.action) {
        case 'new':
          if(notificationAction.notification) {
            this.notifications.push(notificationAction.notification);
          }
          break;
        case 'dismiss':
          this.notifications = this.notifications.filter((toast)=>{
            toast !== notificationAction.notification
          })
          break;
      }
    })
  }

  dismiss(notification: Toast) {
    this.toast.dismiss(notification)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class CustomAlertifyService {
  constructor() {}

  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const messageNotification = alertify[options.messageType](message);
    if (options.isDismissOthers) messageNotification.dismissOthers();
  }

  dismissAll() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: AlertifyMessageType = AlertifyMessageType.Message;
  position: AlertifyMessagePosition = AlertifyMessagePosition.TopRight;
  delay: number = 3;
  isDismissOthers: boolean = false;
}

export enum AlertifyMessageType {
  Error = 'error',
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning',
}

export enum AlertifyMessagePosition {
  TopRight = 'top-right',
  TopCenter = 'top-center',
  TopLeft = 'top-left',
  BottomRight = 'bottom-right',
  BottomCenter = 'bottom-center',
  BottomLeft = 'bottom-left',
}

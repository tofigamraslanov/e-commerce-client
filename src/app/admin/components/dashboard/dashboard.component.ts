import { HubUrls } from './../../../constants/hub-urls';
import { ReceiveFunctions } from './../../../constants/receive-functions';
import { SignalRService } from './../../../services/common/signalr.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomAlertifyService,
  AlertifyMessagePosition,
  AlertifyMessageType,
} from 'src/app/services/admin/custom-alertify.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(
    private alertify: CustomAlertifyService,
    spinner: NgxSpinnerService,
    private signalRService: SignalRService
  ) {
    super(spinner);
    signalRService.start(HubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.signalRService.on(
      ReceiveFunctions.ProductAddedMessageReceiveFunction,
      (message) => {
        this.alertify.message(message, {
          isDismissOthers: true,
          messageType: AlertifyMessageType.Notify,
          position: AlertifyMessagePosition.TopRight,
        });
      }
    );
  }

  m() {
    this.alertify.message('Message', {
      messageType: AlertifyMessageType.Success,
      delay: 3,
      position: AlertifyMessagePosition.TopRight,
    });
  }
  d() {
    this.alertify.dismissAll();
  }
}

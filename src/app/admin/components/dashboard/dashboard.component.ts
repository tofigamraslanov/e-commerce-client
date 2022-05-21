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
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
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

import { Component, OnInit } from '@angular/core';
import {
  CustomAlertifyService,
  AlertifyMessagePosition,
  AlertifyMessageType,
} from 'src/app/services/admin/custom-alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private alertify: CustomAlertifyService) {}

  ngOnInit(): void {}

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

import { Component, OnInit } from '@angular/core';
import {
  AlertifyService,
  MessagePosition,
  MessageType,
} from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private alertify: AlertifyService) {}

  ngOnInit(): void {}

  m() {
    this.alertify.message('Message', {
      messageType: MessageType.Success,
      delay: 3,
      position: MessagePosition.TopRight,
    });
  }
  d() {
    this.alertify.dismissAll();
  }
}

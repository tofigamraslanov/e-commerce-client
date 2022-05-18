import { Component } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessagePosition,
  ToastrMessageType,
} from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ECommerceAppClient';

  constructor(private toastr: CustomToastrService) {
    toastr.message('Order done', 'Order', {
      messageType: ToastrMessageType.Success,
      messagePosition: ToastrMessagePosition.TopLeft,
    });
    toastr.message('Order done', 'Order', {
      messageType: ToastrMessageType.Error,
      messagePosition: ToastrMessagePosition.TopRight,
    });
    toastr.message('Order done', 'Order', {
      messageType: ToastrMessageType.Info,
      messagePosition: ToastrMessagePosition.BottomCenter,
    });
    toastr.message('Order done', 'Order', {
      messageType: ToastrMessageType.Warning,
      messagePosition: ToastrMessagePosition.BottomRight,
    });
  }
}

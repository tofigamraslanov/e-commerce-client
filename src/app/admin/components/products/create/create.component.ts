import {
  AlertifyMessagePosition,
  AlertifyMessageType,
} from './../../../../services/admin/custom-alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Product } from 'src/app/contracts/create_product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CustomAlertifyService } from 'src/app/services/admin/custom-alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinnerService: NgxSpinnerService,
    private alertifyService: CustomAlertifyService,
    private productService: ProductService
  ) {
    super(spinnerService);
  }

  ngOnInit(): void {}

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    if (!name.value) {
      this.alertifyService.message('Name is Required', {
        isDismissOthers: true,
        messageType: AlertifyMessageType.Error,
        position: AlertifyMessagePosition.TopRight,
      });
      return;
    }

    if (parseInt(stock.value) <= 0) {
      this.alertifyService.message('Stock must be greater than or equal to 0', {
        isDismissOthers: true,
        messageType: AlertifyMessageType.Error,
        position: AlertifyMessagePosition.TopRight,
      });
      return;
    }

    this.productService.create(
      create_product,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertifyService.message('Product successfuly added!', {
          isDismissOthers: true,
          messageType: AlertifyMessageType.Success,
          position: AlertifyMessagePosition.TopRight,
        });
      },
      (errorMessage) => {
        this.alertifyService.message(errorMessage, {
          isDismissOthers: true,
          messageType: AlertifyMessageType.Error,
          position: AlertifyMessagePosition.TopRight,
        });
      }
    );
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateProduct } from 'src/app/contracts/createProduct';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }

  ngOnInit(): void {}

  @ViewChild(ListComponent) listComponent: ListComponent;

  createdProduct(createdProduct: CreateProduct) {
    this.listComponent.getProducts();
  }
}

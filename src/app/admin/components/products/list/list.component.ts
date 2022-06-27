import { ProductImageDialogComponent } from './../../../../dialogs/product-image-dialog/product-image-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
  CustomAlertifyService,
} from 'src/app/services/admin/custom-alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinnerService: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService: CustomAlertifyService,
    private dialogService: DialogService
  ) {
    super(spinnerService);
  }

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'photo',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.BallAtom);
    const productsData: { productsCount: number; products: List_Product[] } =
      await this.productService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.BallAtom),
        (errorMessage) =>
          this.alertifyService.message(errorMessage, {
            isDismissOthers: true,
            messageType: AlertifyMessageType.Error,
            position: AlertifyMessagePosition.TopRight,
          })
      );
    this.dataSource = new MatTableDataSource<List_Product>(
      productsData.products
    );
    this.paginator.length = productsData.productsCount;
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: ProductImageDialogComponent,
      data: id,
      options: {
        width: '1400px',
      },
    });
  }

  async pageChanged() {
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }
}

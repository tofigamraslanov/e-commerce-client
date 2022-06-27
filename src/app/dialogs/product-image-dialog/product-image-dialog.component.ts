import {
  DeleteDialogComponent,
  DeleteDialogState,
} from './../delete-dialog/delete-dialog.component';
import { Component, Inject, Output, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from './../../services/common/dialog.service';
import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Product_Image } from './../../contracts/list_product_image';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { BaseDialog } from './../base/base-dialog';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $;

@Component({
  selector: 'app-product-image-dialog',
  templateUrl: './product-image-dialog.component.html',
  styleUrls: ['./product-image-dialog.component.scss'],
})
export class ProductImageDialogComponent
  extends BaseDialog<ProductImageDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<ProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductImageDialogState | string,
    private productService: ProductService,
    private spinnerService: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(dialogRef);
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png, .jpg, .jpeg, .gif',
    action: 'upload',
    controller: 'products',
    explanation: 'Please select product images or drop here...',
    isAdminPage: true,
    queryString: `id=${this.data}`,
  };

  productImages: List_Product_Image[];

  async ngOnInit(): Promise<void> {
    this.spinnerService.show(SpinnerType.BallAtom);
    this.productImages = await this.productService.readImages(
      this.data as string,
      () => this.spinnerService.hide(SpinnerType.BallAtom)
    );
  }

  deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteDialogState.Yes,
      afterClosed: async () => {
        this.spinnerService.show(SpinnerType.BallAtom);
        await this.productService.deleteImages(
          this.data as string,
          imageId,
          () => {
            this.spinnerService.hide(SpinnerType.BallAtom);
            var card = $(event.srcElement).parent().parent();
            card.fadeOut(500);
          }
        );
      },
    });
  }
}

export enum ProductImageDialogState {
  Close,
}

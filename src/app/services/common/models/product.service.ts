import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(product: Create_Product, successCallBack?: any, errorCallBack?: any) {
    this.httpClientService
      .post(
        {
          controller: 'products',
        },
        product
      )
      .subscribe({
        next: (_) => successCallBack(),
        error: (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((e) => {
            e.value.forEach((v) => {
              message += `${v}</br>`;
            });
          });
          errorCallBack(message);
        },
      });
  }
}

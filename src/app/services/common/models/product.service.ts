import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { List_Product } from 'src/app/contracts/list_product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    product: Create_Product,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
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

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ productsCount: number; products: List_Product[] }> {
    const promiseData: Promise<{
      productsCount: number;
      products: List_Product[];
    }> = lastValueFrom(
      this.httpClientService.get<{
        productsCount: number;
        products: List_Product[];
      }>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`,
      })
    );

    promiseData
      .then(() => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => {
        errorCallBack(errorResponse.message);
      });

    return await promiseData;
  }

  async delete(id: string, successCallBack?: () => void) {
    var deleteObservable: Observable<any> = this.httpClientService.delete<any>(
      {
        controller: 'products',
      },
      id
    );

    await lastValueFrom(deleteObservable).then(() => successCallBack());
  }
}

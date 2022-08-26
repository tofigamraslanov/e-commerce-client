import { List_Product_Image } from './../../../contracts/list_product_image';
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
    }> = this.httpClientService
      .get<{
        productsCount: number;
        products: List_Product[];
      }>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`,
      })
      .toPromise();

    promiseData
      .then(() => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => {
        errorCallBack(errorResponse.message);
      });

    return await promiseData;
  }

  async delete(id: string) {
    var deleteObservable: Observable<any> = this.httpClientService.delete<any>(
      {
        controller: 'products',
      },
      id
    );

    await lastValueFrom(deleteObservable);
  }

  async readImages(
    id: string,
    successCallBack?: () => void
  ): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> =
      this.httpClientService.get<List_Product_Image[]>(
        {
          action: 'getProductImages',
          controller: 'products',
        },
        id
      );

    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImages(
    id: string,
    imageId: string,
    successCallBack?: () => void
  ) {
    const deleteObservable = this.httpClientService.delete(
      {
        action: 'deleteProductImage',
        controller: 'products',
        queryString: `imageId=${imageId}`,
      },
      id
    );

    await firstValueFrom(deleteObservable);
    successCallBack();
  }
}

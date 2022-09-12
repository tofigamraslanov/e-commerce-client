import { ProductImageList } from '../../../contracts/productImageList';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { CreateProduct } from 'src/app/contracts/createProduct';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { ProductList } from 'src/app/contracts/productList';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    product: CreateProduct,
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
  ): Promise<{ productsCount: number; products: ProductList[] }> {
    const promiseData: Promise<{
      productsCount: number;
      products: ProductList[];
    }> = this.httpClientService
      .get<{
        productsCount: number;
        products: ProductList[];
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
  ): Promise<ProductImageList[]> {
    const getObservable: Observable<ProductImageList[]> =
      this.httpClientService.get<ProductImageList[]>(
        {
          action: 'getProductImages',
          controller: 'products',
        },
        id
      );

    const images: ProductImageList[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
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

  async changeShowcaseImage(
    imageId: string,
    productId: string,
    successCallBack?: () => void
  ): Promise<void> {
    const observable = this.httpClientService.get({
      controller: 'products',
      action: 'ChangeShowcaseImage',
      queryString: `imageId=${imageId}&productId=${productId}`,
    });

    await firstValueFrom(observable);
    successCallBack();
  }
}

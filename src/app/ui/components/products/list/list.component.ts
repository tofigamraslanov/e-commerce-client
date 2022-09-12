import { ActivatedRoute } from '@angular/router';
import { ProductList } from '../../../../contracts/productList';
import { Component, DebugElement, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { BaseStorageUrl } from 'src/app/contracts/baseStorageUrl';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService
  ) {}

  products: ProductList[];
  baseStorageUrl: BaseStorageUrl;
  currentPageNumber: number;
  productsCount: number;
  pagesCount: number;
  productsPerPage: number = 4;
  pageNumbers: number[] = [];

  async ngOnInit() {
    this.baseStorageUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNumber = parseInt(params['pageNumber'] ?? 1);

      const data: { productsCount: number; products: ProductList[] } =
        await this.productService.read(
          this.currentPageNumber - 1,
          this.productsPerPage,
          () => {},
          (errorMessage) => {}
        );

      this.products = data.products;

      this.products = this.products.map<ProductList>((p) => {
        let productList: ProductList = {
          id: p.id,
          name: p.name,
          price: p.price,
          stock: p.stock,
          createdDate: p.createdDate,
          updatedDate: p.updatedDate,
          mainImagePath: p.productImageFiles.length
            ? p.productImageFiles.find((p) => p.showcase).path
            : '',
          productImageFiles: p.productImageFiles,
        };

        return productList;
      });

      this.productsCount = data.productsCount;
      this.pagesCount = Math.ceil(this.productsCount / this.productsPerPage);

      this.pageNumbers = [];

      if (this.currentPageNumber - 3 <= 0 && this.pagesCount >= 7) {
        for (let i = 1; i <= 7; i++) {
          this.pageNumbers.push(i);
        }
      } else if (this.pagesCount < 7) {
        for (let i = 1; i <= this.pagesCount; i++) {
          this.pageNumbers.push(i);
        }
      } else if (this.currentPageNumber + 3 >= this.pagesCount) {
        for (let i = this.pagesCount - 6; i <= this.pagesCount; i++) {
          this.pageNumbers.push(i);
        }
      } else {
        for (
          let i = this.currentPageNumber - 3;
          i <= this.currentPageNumber + 3;
          i++
        ) {
          this.pageNumbers.push(i);
        }
      }
    });
  }
}

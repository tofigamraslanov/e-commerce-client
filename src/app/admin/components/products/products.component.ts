import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
    this.httpClientService
      .get<Product[]>({
        controller: 'products',
      })
      .subscribe((data) => console.log(data));

    // this.httpClientService
    //   .post(
    //     { controller: 'products' },
    //     {
    //       name: 'Mouse',
    //       stock: 25,
    //       price: 30,
    //     }
    //   )
    //   .subscribe();

    // this.httpClientService
    //   .put(
    //     {
    //       controller: 'products',
    //     },
    //     {
    //       id: '79178419-b527-44a2-8198-5ce677c7f05e',
    //       name: 'Keyboard',
    //       stock: 40,
    //       price: 100,
    //     }
    //   )
    //   .subscribe();

    // this.httpClientService
    //   .delete(
    //     {
    //       controller: 'products',
    //     },
    //     'bb32576f-32ed-4281-8866-3f29a7c38580'
    //   )
    //   .subscribe();
  }
}

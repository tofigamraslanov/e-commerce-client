import { SpinnerType } from './../../base/base.component';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
  CustomAlertifyService,
} from 'src/app/services/admin/custom-alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    private alertifyService: CustomAlertifyService,
    private spinnerService: NgxSpinnerService
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', 'assets/delete.png');
    img.setAttribute('style', 'cursor: pointer;');
    img.width = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onclick() {
    this.spinnerService.show(SpinnerType.BallAtom);
    const td: HTMLTableCellElement = this.element.nativeElement;
    await this.productService.delete(this.id, () =>
      this.alertifyService.message('Product successfuly deleted!', {
        isDismissOthers: true,
        messageType: AlertifyMessageType.Success,
        position: AlertifyMessagePosition.TopRight,
      })
    );
    $(td.parentElement).fadeOut(2000, () => this.callback.emit());
  }
}

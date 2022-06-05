import { DialogService } from './../../services/common/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import {
  DeleteDialogComponent,
  DeleteDialogState,
} from './../../dialogs/delete-dialog/delete-dialog.component';
import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
  CustomAlertifyService,
} from 'src/app/services/admin/custom-alertify.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinnerService: NgxSpinnerService,
    private alertifyService: CustomAlertifyService,
    private dialogService: DialogService
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', 'assets/delete.png');
    img.setAttribute('style', 'cursor: pointer;');
    img.width = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onclick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteDialogState.Yes,
      afterClosed: async () => {
        this.spinnerService.show(SpinnerType.BallAtom);
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService
          .delete(
            {
              controller: this.controller,
            },
            this.id
          )
          .subscribe({
            next: () => {
              $(td.parentElement).animate(
                {
                  opacity: 0,
                  left: '+=50',
                  heught: 'toggle',
                },
                700,
                () => {
                  this.callback.emit();
                  this.alertifyService.message('Product successfuly deleted', {
                    isDismissOthers: true,
                    messageType: AlertifyMessageType.Success,
                    position: AlertifyMessagePosition.TopRight,
                  });
                }
              );
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.spinnerService.hide(SpinnerType.BallAtom);
              this.alertifyService.message(
                'Unexpected error happened while deleting product',
                {
                  isDismissOthers: true,
                  messageType: AlertifyMessageType.Error,
                  position: AlertifyMessagePosition.TopRight,
                }
              );
            },
          });
      },
    });
  }
}

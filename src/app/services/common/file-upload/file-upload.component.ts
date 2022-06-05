import { DialogService, DialogParameters } from './../dialog.service';
import { FileUploadDialogState } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from './../http-client.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrMessagePosition,
} from './../../ui/custom-toastr.service';
import {
  CustomAlertifyService,
  AlertifyMessageType,
  AlertifyMessagePosition,
} from './../../admin/custom-alertify.service';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private customAlertifyService: CustomAlertifyService,
    private customToastrService: CustomToastrService,
    private dialogService: DialogService
  ) {}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const formData: FormData = new FormData();
    for (const file of files) {
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      fileEntry.file((_file: File) => {
        formData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.httpClientService
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            formData
          )
          .subscribe({
            next: (_) => {
              const message: string = 'File successfuly uploaded';
              if (this.options.isAdminPage) {
                this.customAlertifyService.message(message, {
                  isDismissOthers: true,
                  messageType: AlertifyMessageType.Success,
                  position: AlertifyMessagePosition.TopRight,
                });
              } else {
                this.customToastrService.message(message, 'File Upload', {
                  messageType: ToastrMessageType.Success,
                  messagePosition: ToastrMessagePosition.TopRight,
                });
              }
            },
            error: (errorResponse: HttpErrorResponse) => {
              const message: string =
                'Unexpected error happened while uploading file';
              if (this.options.isAdminPage) {
                this.customAlertifyService.message(message, {
                  isDismissOthers: true,
                  messageType: AlertifyMessageType.Error,
                  position: AlertifyMessagePosition.TopRight,
                });
              } else {
                this.customToastrService.message(message, 'File Upload', {
                  messageType: ToastrMessageType.Error,
                  messagePosition: ToastrMessagePosition.TopRight,
                });
              }
            },
          });
      },
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage: boolean = false;
}

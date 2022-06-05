import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadComponent } from './file-upload.component';
import { DialogModule } from 'src/app/dialogs/dialog.module';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule, NgxFileDropModule, DialogModule],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}

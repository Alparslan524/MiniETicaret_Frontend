import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    FileUploadDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class DialogModule { }

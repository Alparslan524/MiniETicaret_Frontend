import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private toastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;



  public selectedFiles(files: NgxFileDropEntry[]) {

    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }//Seçilen dosyayı aldık ve FormData tipine dönüştürdük

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.SquareJellyBox);
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" }),
        }, fileData).subscribe(data => {//Olumlu olursa
          const messageSuccess: string = "Dosyalar başarıyla yüklendi";
          this.spinner.hide(SpinnerType.SquareJellyBox);
          if (this.options.isAdminPage == true) {
            this.alertifyService.message(messageSuccess, {
              messageType: MessageType.Success,
              position: Position.TopRight
            })
            this.options.callBack();
          } else {
            this.toastrService.message(messageSuccess, "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            })
          }
        }, (errorResponse: HttpErrorResponse) => {//Olumsuz olursa
          const messageError: string = "Dosyalar yüklenirken hata ile karşılaşılmıştır.";
          this.options.callBack();
          if (this.options.isAdminPage == true) {
            this.alertifyService.message(messageError, {
              messageType: MessageType.Error,
              position: Position.TopRight
            })
          } else {
            this.toastrService.message(messageError, "Hata!", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
          }
        });
      }
    })
  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width: '300px',
  //     data: FileUploadDialogState.Yes
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == FileUploadDialogState.Yes) {
  //       afterClosed();
  //     }
  //   });
  // }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;//False ise toastr, true ise alertify
  callBack?: () => void;
}


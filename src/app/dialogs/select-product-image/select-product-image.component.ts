import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-select-product-image',
  templateUrl: './select-product-image.component.html',
  styleUrls: ['./select-product-image.component.scss']
})
export class SelectProductImageComponent extends BaseDialog<SelectProductImageComponent> {

  constructor(matDialogRef: MatDialogRef<SelectProductImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string) {
    super(matDialogRef)
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Resimleri seçiniz...",
    isAdminPage: true,
    queryString: `id=${this.data}`
  }

}

export enum SelectProductImageState {
  Close
}
import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(matDialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(matDialogRef)
  }

  images: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.SquareJellyBox);
    await this.getImages();
  }

  async getImages() {
    this.images = await this.productService.readImages(this.data as number, () => this.spinner.hide(SpinnerType.SquareJellyBox));
  }

  async deleteImage(imageId: number, event: any) {

    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.SquareJellyBox);
        await this.productService.deleteImage(this.data as number, imageId, () => {
          this.spinner.hide(SpinnerType.SquareJellyBox);

          var card = $(event.srcElement).parent().parent().parent();
          card.fadeOut(750);
        });
      }
    });
  }

  async showCase(imageId: number) {
    this.spinner.show(SpinnerType.SquareJellyBox);
    this.productService.changeShowcaseImage(imageId, this.data as number, () => {
      this.spinner.hide(SpinnerType.SquareJellyBox);
    })

  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Resimleri seçiniz...",
    isAdminPage: true,
    queryString: `id=${this.data}`,
    callBack: async () => {
      await this.getImages();
    }
  }
}

export enum SelectProductImageState {
  Close
}
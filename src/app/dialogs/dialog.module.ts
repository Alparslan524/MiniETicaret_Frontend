import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadModule } from "../services/common/file-upload/file-upload.module";
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SelectProductImageComponent } from './select-product-image/select-product-image.component';



@NgModule({
    declarations: [
        DeleteDialogComponent,
        SelectProductImageComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        FileUploadModule
    ]
})
export class DialogModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadModule } from "../services/common/file-upload/file-upload.module";
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FormsModule } from '@angular/forms';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';




@NgModule({
    declarations: [
        DeleteDialogComponent,
        SelectProductImageDialogComponent,
        AuthorizeMenuDialogComponent,
        AuthorizeUserDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule, MatButtonModule, MatCardModule, MatBadgeModule, MatListModule,
        FileUploadModule,
        FormsModule
    ]
})
export class DialogModule { }

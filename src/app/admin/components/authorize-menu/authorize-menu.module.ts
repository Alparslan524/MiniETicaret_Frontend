import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: AuthorizeMenuComponent }
    ]),
    MatTreeModule, MatIconModule, MatButtonModule, MatDialogModule
  ]
})
export class AuthorizeMenuModule { }

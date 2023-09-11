import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:CustomersComponent}//CustomersModule'e istek geldiği anda CustomersComponent tetiklenecek
    ])
  ]
})
export class CustomersModule { }

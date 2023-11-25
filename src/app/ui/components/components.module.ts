import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { RegisterModule } from './register/register.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule, ProductsModule, HomeModule, BasketsModule, RegisterModule, PasswordResetModule, UpdatePasswordModule
    // LoginModule LoginComponenti direkt appmoduleye bağladık. Çünkü google giriş işlemleri sadece appmodulede oluyor
  ]
})
export class ComponentsModule { }

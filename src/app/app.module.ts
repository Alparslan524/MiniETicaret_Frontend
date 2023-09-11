import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,UiModule, BrowserAnimationsModule//Export,import önemli
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//Birden fazla component kullanacağımız zaman mesela Customer ile ilgili birden fazla component varsa bu componentlerin yönetimi 
//Customer moduleden yapılacak
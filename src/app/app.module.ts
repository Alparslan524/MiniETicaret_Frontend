import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteDirective } from './directives/admin/delete.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,UiModule, 
    BrowserAnimationsModule,//Export,import önemli
    ToastrModule.forRoot(),
    NgxSpinnerModule,//Bunu spinner kullanacağımız her yerde import etmemiz gerek. Ama uygulamanın ana modulesinde ve componentinde yazdık.
                    //Böylelikle her html dosyasında <ngx-spinner></ngx-spinner> yazmamıza gerek yok. Sadece kullanacağımız modulede ctor içine 
                    //NgxSpinnerService nesnesini oluşturarak .show ile gösterebilirizz
    HttpClientModule
  
  
  
  ],
  providers: [
    {provide: "baseUrl", useValue:"https://localhost:7032/api",multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//Birden fazla component kullanacağımız zaman mesela Customer ile ilgili birden fazla component varsa bu componentlerin yönetimi 
//Customer moduleden yapılacak
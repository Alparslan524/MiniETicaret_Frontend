import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorHandlerInterceptorService } from './services/common/interceptor/http-error-handler-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule,
    AdminModule, UiModule,
    BrowserAnimationsModule,//Export,import önemli
    ToastrModule.forRoot(),
    NgxSpinnerModule,//Bunu spinner kullanacağımız her yerde import etmemiz gerek. Ama uygulamanın ana modulesinde ve componentinde yazdık.
    //Böylelikle her html dosyasında <ngx-spinner></ngx-spinner> yazmamıza gerek yok. Sadece kullanacağımız modulede ctor içine 
    //NgxSpinnerService nesnesini oluşturarak .show ile gösterebilirizz
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7032"]
      }
    }),
    SocialLoginModule

  ],
  providers: [
    { provide: "baseUrl", useValue: "https://localhost:7032/api", multi: true },
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("94058850904-c256r95i1vte512d70use3mlleg0q1n6.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//Birden fazla component kullanacağımız zaman mesela Customer ile ilgili birden fazla component varsa bu componentlerin yönetimi 
//Customer moduleden yapılacak
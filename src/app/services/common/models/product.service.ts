import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();//Başarıyla bitti dönüyoruz
    }, (errorResponse: HttpErrorResponse) => {//Başarıyla bitmezse, sunucu hata verirse
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;//Hatayı yakalıyoruz(sunucudan gelen tip şeklinde)
      let message = "";
      _error.forEach((v, index) => {//yakaldığımız diziyi ayrıştırıyoruz ve birleştiriyoruz.
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  //default olarak 0.sayfa 5 tane eleman.
  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }> {//21.Ders
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));
    return await promiseData;
  }


  // delete(id: number) {
  //   this.httpClientService.delete({
  //     controller: "product"
  //   }, id)
  // }
  async delete(id: number) {
    const deleteObservable : Observable<any> =  this.httpClientService.delete<any>({
      controller: "products"
    }, id)
    await firstValueFrom(deleteObservable);
  }

}

import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareJellyBox);


    /******************************************/
    //Get İşlemi
    // this.httpClientService.get<Product[]>({
    //   controller: "products"
    // }).subscribe(data => console.log(data[0]));
    /****************************************/
    //Post İşlemi
    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name: "Kalem",
    //   stock: 100,
    //   price: 10
    // }).subscribe();
    /****************************************/
    //Put İşlemi
    // this.httpClientService.put({
    //   controller: "products"
    // }, {
    //   id: 37,
    //   name: "Güncelleştirilmiş Kalem",
    //   stock: 111,
    //   price: 11
    // }).subscribe();
    /******************************************/
    //Delete İşlemi
    // this.httpClientService.delete({
    //   controller: "products"
    // }, 3).subscribe();
    //İd'si 3 olan ürünü sil
    /******************************************/
    //Başka bir api'dan veri çekme
    // this.httpClientService.get({
    //   fullEndPoint:"https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data=>console.log(data));

  }
}

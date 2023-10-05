import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyOptions, AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {
  }

  @Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter();
  //Create Product düğmesine basıldığında tabloyu güncelleyecek

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.LineScale);//Düğmeye tıklandığında spinner gelsin
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.LineScale);
      this.alertify.message("Ürün Başarıyla Eklendi!", {
        messageType: MessageType.Success,
        position: Position.TopRight
      });//successCallBack yani işlem başarıyla dönerse spinner hide edilecek, alertify ile mesaj verilecek.
      this.createdProduct.emit(create_product);//create_product nesnesini fırlatıyoruz nereye? bir üst componente ProductsComponente
    },errorMessage => { //eğer errorCallBack ise hata vericek
      this.alertify.message(errorMessage,{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      });
    });
  }



}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { SelectProductImageComponent } from 'src/app/dialogs/select-product-image/select-product-image.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createDate', 'updatedDate','photo','edit', 'delete'];//Kolonlarımız 
  //Buradaki isimler contractsdaki modellerimizin değişken isimleri ile aynı olmalıdır
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() {//Tablo güncelleme fonksiyonu gibi
    this.showSpinner(SpinnerType.SquareJellyBox);
    const allProducts: { totalCount: number; products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,//paginator yok ise default değerler, var ise paginator değerleri
      () => this.hideSpinner(SpinnerType.SquareJellyBox),//Success call back
      errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      }));
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
    //Servisimizdeki read işlemi ile tüm productları okuyoruz, success dönerse spinneri kapatıyor, error dönerse hata mesajını alertify 
    //ile veriyor. Daha sonra dataSourceye bu verileri aktarıyor. Tabloyada data source dönülüyor




    //this.dataSource.paginator = this.paginator;//Sayfalama işlemi için alttaki paginator ile dataSourceyi birleştiriyoruz gibi
  }

  async pageChanged() {
    await this.getProducts();
  }

  addProductImage(id : string){
  this.dialogService.openDialog({
    componentType:SelectProductImageComponent,
    data:id,
    options:{
      width:"1400px"
    }
  });
  };

}

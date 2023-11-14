import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private productService: ProductService, private activatedRoute: ActivatedRoute,
    private fileService: FileService) { super(spinner) }

  pageSize: number = 12;
  products: List_Product[];
  totalCount: number;
  totalPageCount: number;

  currentPageNo: number;
  pageList: number[] = [];

  baseUrl: BaseUrl;

  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() {
    this.showSpinner(SpinnerType.SquareJellyBox);

    this.baseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data: { totalCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize, () => {
        this.hideSpinner(SpinnerType.SquareJellyBox);
      }, errorMessage => {

      })

      this.products = data.products;

      this.products = this.products.map<List_Product>(p => {
        const listProduct: List_Product = {
          id: p.id,
          createDate: p.createDate,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles
        };
        return listProduct;
      });

      this.totalCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++)
          this.pageList.push(i);
      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);

      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
    });
  }

}

import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective{

  constructor(private element: ElementRef, private _renderer: Renderer2, private productService: ProductService,private spinner: NgxSpinnerService) {
    //Bu directiveyi çağıran yerlerde aşağıdaki kodlar çalışacak
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: number;
  @Output() callBack: EventEmitter<any> = new EventEmitter();//list.component.html e bak

  //Directivenin kullanıldığı nesneye ne zaman "click" edilirse aşağıdaki fonksiyon çalışacak. 
  //click yerine başka şeyler de yazabilirdik. Mesela cursor üzerine gelince vs
  @HostListener("click")
  async onclick() {
    //this.showSpinner(SpinnerType.SquareJellyBox); Bu şekilde yapmamız için bu directive Basecomponent'i extends etmesi lazım
    //Ama bu solide aykırı. O yüzden direkt spinner üzerinden çalışma yaptık.
    this.spinner.show(SpinnerType.SquareJellyBox);
    
    const td: HTMLTableCellElement = this.element.nativeElement;//Tıklanılan tablo hücresini yakaladık.
    await this.productService.delete(this.id);//Silme işlemi gerçekleşene kadar await sayesinde bekleyecek
    $(td.parentElement).fadeOut(2000, () => {
      this.callBack.emit();//Fadeout yani silme animasyonu bittikten sonra output ile yakaladığımız tablo güncelleme fonksiyonunu başlat.
    });
  }

}

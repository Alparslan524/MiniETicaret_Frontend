import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertify: AlertifyService
  ) {
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
  @Input() controller: string;

  //Directivenin kullanıldığı nesneye ne zaman "click" edilirse aşağıdaki fonksiyon çalışacak. 
  //click yerine başka şeyler de yazabilirdik. Mesela cursor üzerine gelince vs
  @HostListener("click")
  async onclick() {
    //Opendialog ile 300px lik uyarı penceresi açıldı. Düğmeye tıklandıktan sonra yani bildirim kapandıktan sonra
    //eğer gelen sonuç yes ise callback fonksiyonu afterClosed çalışacak. Yani aşağıdaki ()=> sonraki kodlar çalışacak. 
    //Eğer iptale tyıklanırsa Close çalışacak. Bunları delete-dialog.component.html den anlıyoruz
    this.openDialog(async () => {

      //this.showSpinner(SpinnerType.SquareJellyBox); Bu şekilde yapmamız için bu directive Basecomponent'i extends etmesi lazım
      //Ama bu solide aykırı. O yüzden direkt spinner üzerinden çalışma yaptık.
      this.spinner.show(SpinnerType.SquareJellyBox);

      const td: HTMLTableCellElement = this.element.nativeElement;//Tıklanılan tablo hücresini yakaladık.
      this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).fadeOut(2000, () => {
          this.callBack.emit();//Fadeout yani silme animasyonu bittikten sonra output ile yakaladığımız tablo güncelleme fonksiyonunu başlat.
          this.alertify.message("Ürün başarıyla silindi", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          })
        });
      }, (errorResponse: HttpErrorResponse) => {
        this.spinner.hide(SpinnerType.SquareJellyBox);
        this.alertify.message("Beklenmeyen hata!", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        })
      });
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }



}


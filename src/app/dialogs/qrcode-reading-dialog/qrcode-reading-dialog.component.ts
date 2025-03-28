import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from '../../services/common/qr-code.service';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { MatButton } from '@angular/material/button';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { ProductService } from '../../services/common/models/product.service';
import { SpinnerType } from '../../base/base.component';

declare var $:any

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html'
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit, OnDestroy {

  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private productService : ProductService,
    private qrCodeService: QrCodeService,) {
    super(dialogRef)
  }


  @ViewChild("scanner", { static: true }) scanner: NgxScannerQrcodeComponent;
  @ViewChild("txtStock", { static: true }) txtStock: ElementRef;



  ngOnInit(): void {
    this.scanner.start();
  }


  ngOnDestroy(): void {
    this.scanner.stop();
  }

  onEvent(e) {
    this.spinner.show(SpinnerType.BallAtom);
    const firstElement = e[0];
    const data = firstElement.value;

    if (data != null && data != "") {

      const jsonData = JSON.parse(data);
      const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;

      //console.log(jsonData.Id, stockValue)
      this.scanner.pause();
      

      this.productService.UpdateStockViaQrCode(jsonData.Id, parseInt(stockValue), () => {
        $("#btnClose").click();
        this.toastrService.message(`${jsonData.Name} ürününün stok bilgisi güncellenmiştir.`, "Stok Güncelleme Başarılı", {
          messageType: ToastrMessageType.Info,
          positon: ToastrPosition.TopRight
        });

        this.spinner.hide(SpinnerType.BallAtom);

      });
    }
  }
}

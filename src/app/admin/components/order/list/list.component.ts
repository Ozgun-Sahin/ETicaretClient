import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../../../../services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { List_Product } from '../../../../contracts/list_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { List_Order } from '../../../../contracts/order/list_order';
import { OrderService } from '../../../../services/common/models/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService,
    private orderService: OrderService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }

  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createdDate', 'delete'];
  dataSource: MatTableDataSource<List_Order> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getOrders() {
    this.showSpinner(SpinnerType.BallAtom);
    const allOrders: { totalOrderCount: number; orders: List_Order[] } = await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;
  }

  async pageChanged() {
    await this.getOrders();
  }


  async ngOnInit() {
    await this.getOrders();
  }
}

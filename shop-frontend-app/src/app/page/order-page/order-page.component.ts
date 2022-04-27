import { Component, OnInit } from '@angular/core';
import {Order} from "../../model/order";
import {OrderService} from "../../service/order.service";
import {OrderStatusService} from "../../service/order-status.service";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService, private orderStatusService: OrderStatusService) { }

  ngOnInit(): void {
    this.orderService.findOrdersByCurrentUser()
      .subscribe(orders => {
        this.orders = orders;
      }, err => {
        console.log(`Error retriving orders ${err}`);
      });
    this.orderStatusService.onMessage('/order_out/order')
      .subscribe(msg => {
        let updated = this.orders.find(order => order.id === msg.orderId);
        if (updated) {
          updated.status = msg.status;
        }
      });
  }

}

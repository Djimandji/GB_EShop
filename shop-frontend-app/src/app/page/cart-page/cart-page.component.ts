import {Component, OnInit} from '@angular/core';
import {CartService} from "../../service/cart.service";
import {AllCartDto} from "../../model/all-cart-dto";
import {OrderService} from "../../service/order.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  content?: AllCartDto;

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cartUpdated();
  }

  cartUpdated() {
    this.cartService.findAll().subscribe(
      res => {
        this.content = res;
      }
    )
  }

  private _createOrderCallback() {
    this.orderService.createOrder()
      .subscribe();
  }

  createOrder() {
    if (!this.authService.isAuthenticated()) {
      this.authService.redirectUrl = '/order';
      this.authService.callbackAfterSuccess = this._createOrderCallback.bind(this);
      this.router.navigateByUrl('/login');
      return;
    }
    this.orderService.createOrder()
      .subscribe(() => this.router.navigateByUrl('/order'));
  }
}
